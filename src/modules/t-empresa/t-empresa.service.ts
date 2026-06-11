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
    return this.prisma.tEmpresa.create({
      data,
    });
  }

  async updateTEmpresa(id: number, data: TEmpresaDto) {
    return this.prisma.tEmpresa.update({
      where: { companyId: id },
      data,
    });
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
}
