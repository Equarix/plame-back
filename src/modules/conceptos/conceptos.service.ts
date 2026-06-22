import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ConceptosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createConceptoDto: CreateConceptoDto) {
    const { subConcepto, ...rest } = createConceptoDto;

    return this.prisma.tConceptos.create({
      data: {
        ...rest,
        subTipo: subConcepto || null,
      },
    });
  }

  findAll() {
    return this.prisma.tConceptos.findMany();
  }

  findOne(id: number) {
    return this.prisma.tConceptos.findUnique({
      where: { conceptoId: id },
    });
  }

  async update(id: number, updateConceptoDto: UpdateConceptoDto) {
    const { subConcepto, ...rest } = updateConceptoDto;

    const find = await this.prisma.tConceptos.findUnique({
      where: { conceptoId: id },
    });

    if (!find) {
      throw new NotFoundException('Concepto not found');
    }

    return this.prisma.tConceptos.update({
      where: { conceptoId: id },
      data: {
        ...rest,
        subTipo: subConcepto || null,
      },
    });
  }

  async remove(id: number) {
    const find = await this.prisma.tConceptos.findUnique({
      where: { conceptoId: id },
    });

    if (!find) {
      throw new NotFoundException('Concepto not found');
    }

    return this.prisma.tConceptos.update({
      where: { conceptoId: id },
      data: { estado: false },
    });
  }
}
