import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryDto } from '../../common/dto/query.dto';
import { TEmpresaDto } from './dto/t-empresa.dto';

@Injectable()
export class TEmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async getTEmpresa(query: QueryDto) {
    const { page, limit } = query;

    const [data, count] = await this.prisma.$transaction([
      this.prisma.tEmpresa.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          tempresaConceptos: {
            include: {
              concepto: true,
            },
          },
        },
      }),
      this.prisma.tEmpresa.count(),
    ]);
    const metadata = {
      totalItems: count,
      itemCount: data.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };

    return { data, metadata };
  }

  async createTEmpresa(data: TEmpresaDto) {
    const { conceptos, ...empresaData } = data;

    return this.prisma.$transaction(async (tx) => {
      const newEmpresa = await tx.tEmpresa.create({
        data: empresaData,
      });

      const findConceptos = await this.prisma.tConceptos.findMany({
        where: {
          conceptoId: {
            in: conceptos,
          },
        },
      });

      if (findConceptos.length !== conceptos.length) {
        throw new NotFoundException('Some concepts not found');
      }

      const newConceptos = await tx.tEmpresaConceptos.createMany({
        data: conceptos.map((conceptoId) => ({
          tEmpresaCompanyId: newEmpresa.companyId,
          conceptoId,
        })),
      });

      return { ...newEmpresa, conceptos: newConceptos };
    });
  }

  async updateTEmpresa(id: number, data: TEmpresaDto) {
    const { conceptos, ...empresaData } = data;

    const company = await this.prisma.tEmpresa.findUnique({
      where: { companyId: id },
    });

    if (!company) {
      throw new NotFoundException(`TEmpresa with ID ${id} not found`);
    }

    const findConceptos = await this.prisma.tConceptos.findMany({
      where: {
        conceptoId: {
          in: conceptos,
        },
      },
    });

    if (findConceptos.length !== conceptos.length) {
      throw new NotFoundException('Some concepts not found');
    }

    const updatedEmpresa = await this.prisma.tEmpresa.update({
      where: { companyId: id },
      data: empresaData,
    });

    await this.prisma.tEmpresaConceptos.deleteMany({
      where: { tEmpresaCompanyId: id },
    });

    const newConceptos = await this.prisma.tEmpresaConceptos.createMany({
      data: conceptos.map((conceptoId) => ({
        tEmpresaCompanyId: id,
        conceptoId,
      })),
    });

    return { ...updatedEmpresa, conceptos: newConceptos };
  }

  async deleteTEmpresa(id: number) {
    const find = await this.prisma.tEmpresa.findUnique({
      where: { companyId: id },
    });

    if (!find) {
      throw new NotFoundException('TEmpresa not found');
    }

    return this.prisma.tEmpresa.update({
      data: { status: false },
      where: { companyId: id },
    });
  }

  async getPublicTEmpresa() {
    return this.prisma.tEmpresa.findMany({
      where: { status: true },
    });
  }

  async getPublicTEmpresaWithConceptos(id: number) {
    const empresa = await this.prisma.tEmpresa.findFirst({
      where: { companyId: id, status: true },
    });

    if (!empresa) {
      throw new NotFoundException('TEmpresa not found');
    }
    const conceptos = await this.prisma.tEmpresaConceptos.findMany({
      where: { tEmpresaCompanyId: id },
      include: { concepto: true },
    });

    return { ...empresa, conceptos };
  }
}
