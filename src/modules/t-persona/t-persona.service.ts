import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTPersonaDto } from './dto/create-t-persona.dto';
import { UpdateTPersonaDto } from './dto/update-t-persona.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TPersonaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTPersonaDto: CreateTPersonaDto, userId: number) {
    const {
      personaId,
      ocupacionId,
      entidadId,
      estudios,
      tEmpresaCompanyId,
      situacionEducativaId,
      ...rest
    } = createTPersonaDto;

    const tPersona = await this.prisma.tPersona.create({
      data: {
        ...rest,
        persona: {
          connect: { personaId },
        },
        ocupacion: {
          connect: { ocupacionId },
        },
        entidad: {
          connect: { entidadId },
        },
        tempresa: {
          connect: { companyId: tEmpresaCompanyId },
        },
        situacionEducativa: {
          connect: { situacionEducativaId },
        },
        user: {
          connect: { userId },
        },
      },
    });

    const estudiosData = await Promise.all(
      estudios.map(async (estudio) => {
        return await this.prisma.estudios.create({
          data: {
            ...estudio,
            tPersona: {
              connect: { tPersonaId: tPersona.tPersonaId },
            },
          },
        });
      }),
    );

    return {
      ...tPersona,
      estudios: estudiosData,
    };
  }

  findAll(idEmpresa: number) {
    return this.prisma.tPersona.findMany({
      where: {
        tempresa: {
          companyId: idEmpresa,
        },
      },
      include: {
        persona: {
          include: {
            direcciones: true,
          },
        },
        ocupacion: true,
        situacionEducativa: true,
        estudios: true,
      },
    });
  }

  async findOne(id: number) {
    const tPersona = await this.prisma.tPersona.findUnique({
      where: { tPersonaId: id },
      include: {
        persona: true,
        ocupacion: true,
        entidad: true,
        situacionEducativa: true,
        estudios: true,
      },
    });

    if (!tPersona) {
      throw new NotFoundException(`TPersona with ID ${id} not found`);
    }

    return tPersona;
  }

  async update(id: number, updateTPersonaDto: UpdateTPersonaDto) {
    const existingTPersona = await this.prisma.tPersona.findUnique({
      where: { tPersonaId: id },
    });

    if (!existingTPersona) {
      throw new NotFoundException(`TPersona with ID ${id} not found`);
    }

    const {
      estudios,
      personaId,
      ocupacionId,
      entidadId,
      tEmpresaCompanyId,
      situacionEducativaId,
      ...rest
    } = updateTPersonaDto;

    await this.prisma.tPersona.update({
      where: { tPersonaId: id },
      data: {
        ...rest,
        ...(personaId && { persona: { connect: { personaId } } }),
        ...(ocupacionId && { ocupacion: { connect: { ocupacionId } } }),
        ...(entidadId && { entidad: { connect: { entidadId } } }),
        ...(tEmpresaCompanyId && {
          tempresa: { connect: { companyId: tEmpresaCompanyId } },
        }),
        ...(situacionEducativaId && {
          situacionEducativa: { connect: { situacionEducativaId } },
        }),
      },
    });

    if (estudios) {
      await this.prisma.estudios.deleteMany({
        where: { tPersonaId: id },
      });

      await Promise.all(
        estudios.map(async (estudio) => {
          const {
            formacionCompleta,
            estudioPeru,
            privado,
            tipoEducacion,
            nombreInstitucion,
            nombreCarrera,
            añoEgreso,
          } = estudio;

          return await this.prisma.estudios.create({
            data: {
              formacionCompleta,
              estudioPeru,
              privado,
              tipoEducacion,
              nombreInstitucion,
              nombreCarrera,
              añoEgreso,
              tPersona: {
                connect: { tPersonaId: id },
              },
            },
          });
        }),
      );
    }

    return { message: `TPersona with ID ${id} updated successfully` };
  }

  async remove(id: number) {
    const existingTPersona = await this.prisma.tPersona.findUnique({
      where: { tPersonaId: id },
    });

    if (!existingTPersona) {
      throw new NotFoundException(`TPersona with ID ${id} not found`);
    }

    await this.prisma.estudios.deleteMany({
      where: { tPersonaId: id },
    });

    await this.prisma.tPersona.delete({
      where: { tPersonaId: id },
    });

    return { message: `TPersona with ID ${id} removed successfully` };
  }
}
