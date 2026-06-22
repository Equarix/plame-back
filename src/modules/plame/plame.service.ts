import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SyncPlameDto, UpdatePlameDetalleDto, UpdatePlameDeclaracionDto } from './dto/plame.dto';

@Injectable()
export class PlameService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(syncDto: SyncPlameDto) {
    const { companyId, periodo } = syncDto;

    let declaracion = await this.prisma.plameDeclaracion.findFirst({
      where: {
        companyId,
        periodo,
      },
      include: {
        detalles: {
          include: {
            tPersona: {
              include: {
                persona: true,
                ocupacion: true,
              },
            },
            ingresos: true,
            descuentos: true,
            tributos: true,
          },
        },
      },
    });

    if (!declaracion) {
      declaracion = await this.prisma.plameDeclaracion.create({
        data: {
          companyId,
          periodo,
          estado: 'En Proceso',
          totalNetoAPagar: 0.0,
        },
        include: {
          detalles: {
            include: {
              tPersona: {
                include: {
                  persona: true,
                  ocupacion: true,
                },
              },
              ingresos: true,
              descuentos: true,
              tributos: true,
            },
          },
        },
      });
    }

    return declaracion;
  }

  async syncTRegistro(syncDto: SyncPlameDto) {
    const { companyId, periodo } = syncDto;

    const declaracion = await this.findOrCreate(syncDto);

    const tPersonas = await this.prisma.tPersona.findMany({
      where: {
        tEmpresaCompanyId: companyId,
      },
      include: {
        persona: true,
      },
    });

    const companyConceptos = await this.prisma.tEmpresaConceptos.findMany({
      where: { tEmpresaCompanyId: companyId },
      include: { concepto: true },
    });

    for (const tp of tPersonas) {
      const exists = declaracion.detalles.some(d => d.tPersonaId === tp.tPersonaId);
      if (!exists) {
        // dynamic ingresos
        const dynamicIngresos = companyConceptos
          .filter(cc => cc.concepto.tipo === 'INGRESO')
          .map(cc => {
            const isBaseSalary = cc.concepto.codigo === '0121';
            return {
              code: cc.concepto.codigo,
              name: cc.concepto.nombre,
              devengado: isBaseSalary ? tp.montoRemuneracionInicial : 0.0,
              pagado: isBaseSalary ? tp.montoRemuneracionInicial : 0.0,
            };
          });

        const ingresosToCreate = dynamicIngresos.length > 0 ? dynamicIngresos : [
          { code: '0105', name: 'TRABAJO SOBRETIEMPO (H. EXTRAS 25%)', devengado: 0, pagado: 0 },
          { code: '0106', name: 'TRABAJO SOBRETIEMPO (H. EXTRAS 35%)', devengado: 0, pagado: 0 },
          { code: '0107', name: 'TRABAJO EN FERIADO O DÍA DESCANSO', devengado: 0, pagado: 0 },
          { code: '0118', name: 'REMUNERACIÓN VACACIONAL', devengado: 0, pagado: 0 },
          {
            code: '0121',
            name: 'REMUNERACION O JORNAL BASICO',
            devengado: tp.montoRemuneracionInicial,
            pagado: tp.montoRemuneracionInicial,
          },
          { code: '0122', name: 'REMUNERACIÓN PERMANENTE', devengado: 0, pagado: 0 },
          { code: '0201', name: 'ASIGNACIÓN FAMILIAR', devengado: 0, pagado: 0 },
          { code: '0311', name: 'BONIFICACION UNIFICADA DE CONSTRUCC', devengado: 0, pagado: 0 },
          { code: '0406', name: 'GRATIF. F.PATRIAS NAVIDAD LEY 29351 Y 30334', devengado: 0, pagado: 0 },
          { code: '0407', name: 'GRATIFIC. PROPORCIONAL - LEY 29351 Y 30334', devengado: 0, pagado: 0 },
          { code: '0504', name: 'INDEMNIZACIÓN VACACIONES NO GOZADAS', devengado: 0, pagado: 0 },
          { code: '0904', name: 'COMPENSACIÓN TIEMPO DE SERVICIOS', devengado: 0, pagado: 0 },
        ];

        // dynamic descuentos
        const dynamicDescuentos = companyConceptos
          .filter(cc => cc.concepto.tipo === 'DESCUENTO')
          .map(cc => ({
            code: cc.concepto.codigo,
            name: cc.concepto.nombre,
            monto: 0.0,
          }));

        // dynamic tributos
        const dynamicTributos = companyConceptos
          .filter(cc => cc.concepto.tipo === 'TRIBUTO')
          .map(cc => {
            const isEssalud = cc.concepto.codigo === '0804';
            const base = isEssalud
              ? (tp.montoRemuneracionInicial < 1130 ? 1130 : tp.montoRemuneracionInicial)
              : tp.montoRemuneracionInicial;
            const pct = cc.concepto.porcentaje || 0;
            const monto = pct > 0 ? Number((base * (pct / 100)).toFixed(2)) : 0;
            return {
              code: cc.concepto.codigo,
              name: cc.concepto.nombre,
              base: pct > 0 ? base : 0,
              monto,
            };
          });

        const tributosToCreate = dynamicTributos.length > 0 ? dynamicTributos : [
          {
            code: '0804',
            name: 'ESSALUD(REGULAR CBSSP AGRAR/AC)TRAB',
            base: tp.montoRemuneracionInicial < 1130 ? 1130 : tp.montoRemuneracionInicial,
            monto: Number(((tp.montoRemuneracionInicial < 1130 ? 1130 : tp.montoRemuneracionInicial) * 0.09).toFixed(2)),
          },
        ];

        await this.prisma.plameDetallePersona.create({
          data: {
            plameDeclaracionId: declaracion.plameDeclaracionId,
            tPersonaId: tp.tPersonaId,
            diasLaborados: 30,
            diasSubsidiados: 0,
            diasNoLaborados: 0,
            horasOrdinarias: '240:00',
            horasSobretiempo: '00:00',
            ingresos: {
              create: ingresosToCreate,
            },
            descuentos: {
              create: dynamicDescuentos,
            },
            tributos: {
              create: tributosToCreate,
            },
          },
        });
      }
    }

    return this.prisma.plameDeclaracion.findUnique({
      where: { plameDeclaracionId: declaracion.plameDeclaracionId },
      include: {
        detalles: {
          include: {
            tPersona: {
              include: {
                persona: true,
                ocupacion: true,
              },
            },
            ingresos: true,
            descuentos: true,
            tributos: true,
          },
        },
      },
    });
  }

  async updateDetalle(detalleId: number, dto: UpdatePlameDetalleDto) {
    const detalle = await this.prisma.plameDetallePersona.findUnique({
      where: { detalleId },
    });

    if (!detalle) {
      throw new NotFoundException(`PlameDetallePersona with ID ${detalleId} not found`);
    }

    const { ingresos, descuentos, tributos, ...rest } = dto;

    await this.prisma.plameDetallePersona.update({
      where: { detalleId },
      data: rest,
    });

    if (ingresos) {
      await this.prisma.plameDetalleIngreso.deleteMany({ where: { detalleId } });
      await this.prisma.plameDetalleIngreso.createMany({
        data: ingresos.map(i => ({
          detalleId,
          code: i.code,
          name: i.name,
          devengado: Number(i.devengado) || 0,
          pagado: Number(i.pagado) || 0,
        })),
      });

      // Recalculate and update Essalud based on new income
      const totalTaxable = ingresos.reduce((sum, item) => sum + (Number(item.devengado) || 0), 0);
      const essaludBase = totalTaxable < 1130 ? 1130 : totalTaxable;
      const essaludMonto = Number((essaludBase * 0.09).toFixed(2));

      await this.prisma.plameDetalleTributo.deleteMany({ where: { detalleId } });
      await this.prisma.plameDetalleTributo.create({
        data: {
          detalleId,
          code: '0804',
          name: 'ESSALUD(REGULAR CBSSP AGRAR/AC)TRAB',
          base: essaludBase,
          monto: essaludMonto,
        },
      });
    } else if (tributos) {
      await this.prisma.plameDetalleTributo.deleteMany({ where: { detalleId } });
      await this.prisma.plameDetalleTributo.createMany({
        data: tributos.map(t => ({
          detalleId,
          code: t.code,
          name: t.name,
          base: Number(t.base) || 0,
          monto: Number(t.monto) || 0,
        })),
      });
    }

    if (descuentos) {
      await this.prisma.plameDetalleDescuento.deleteMany({ where: { detalleId } });
      await this.prisma.plameDetalleDescuento.createMany({
        data: descuentos.map(d => ({
          detalleId,
          code: d.code,
          name: d.name,
          monto: Number(d.monto) || 0,
        })),
      });
    }

    await this.recalculateDeclaracionTotals(detalle.plameDeclaracionId);

    return this.prisma.plameDetallePersona.findUnique({
      where: { detalleId },
      include: {
        tPersona: {
          include: {
            persona: true,
            ocupacion: true,
          },
        },
        ingresos: true,
        descuentos: true,
        tributos: true,
      },
    });
  }

  async recalculateDeclaracionTotals(plameDeclaracionId: number) {
    const detalles = await this.prisma.plameDetallePersona.findMany({
      where: { plameDeclaracionId },
      include: {
        ingresos: true,
        descuentos: true,
        tributos: true,
      },
    });

    let totalDeclarado = 0;

    for (const d of detalles) {
      const devengadoTotal = d.ingresos.reduce((sum, item) => sum + item.devengado, 0);
      const descuentosTotal = d.descuentos.reduce((sum, item) => sum + item.monto, 0);
      const tributosTrabajadorTotal = d.tributos
        .filter(item => item.code !== '0804')
        .reduce((sum, item) => sum + item.monto, 0);

      const netoTrabajador = devengadoTotal - descuentosTotal - tributosTrabajadorTotal;
      const essaludMonto = d.tributos
        .filter(item => item.code === '0804')
        .reduce((sum, item) => sum + item.monto, 0);

      totalDeclarado += netoTrabajador + essaludMonto;
    }

    await this.prisma.plameDeclaracion.update({
      where: { plameDeclaracionId },
      data: {
        totalNetoAPagar: Number(totalDeclarado.toFixed(2)),
      },
    });
  }

  async updateDeclaracion(plameDeclaracionId: number, dto: UpdatePlameDeclaracionDto) {
    const declaracion = await this.prisma.plameDeclaracion.findUnique({
      where: { plameDeclaracionId },
    });

    if (!declaracion) {
      throw new NotFoundException(`PlameDeclaracion with ID ${plameDeclaracionId} not found`);
    }

    return this.prisma.plameDeclaracion.update({
      where: { plameDeclaracionId },
      data: dto,
      include: {
        detalles: {
          include: {
            tPersona: {
              include: {
                persona: true,
                ocupacion: true,
              },
            },
            ingresos: true,
            descuentos: true,
            tributos: true,
          },
        },
      },
    });
  }

  findAllByCompany(companyId: number) {
    return this.prisma.plameDeclaracion.findMany({
      where: { companyId },
      orderBy: { periodo: 'desc' },
      include: {
        detalles: {
          include: {
            tPersona: {
              include: {
                persona: true,
                ocupacion: true,
              },
            },
            ingresos: true,
            descuentos: true,
            tributos: true,
          },
        },
      },
    });
  }
}
