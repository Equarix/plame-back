import { Injectable } from '@nestjs/common';
import { CreateSituacionesAcademicaDto } from './dto/create-situaciones-academica.dto';
import { UpdateSituacionesAcademicaDto } from './dto/update-situaciones-academica.dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryDto } from '../../common/dto/query.dto';

@Injectable()
export class SituacionesAcademicasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSituacionesAcademicaDto: CreateSituacionesAcademicaDto) {
    return this.prisma.situacionesEducativas.create({
      data: createSituacionesAcademicaDto,
    });
  }

  async findAll(query: QueryDto) {
    const { page, limit } = query;

    const [data, count] = await this.prisma.$transaction([
      this.prisma.situacionesEducativas.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.situacionesEducativas.count(),
    ]);

    const metadata = {
      totalItems: count,
      itemCount: data.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };

    return { data, metadata };
  }

  update(
    id: number,
    updateSituacionesAcademicaDto: UpdateSituacionesAcademicaDto,
  ) {
    return this.prisma.situacionesEducativas.update({
      where: { situacionEducativaId: id },
      data: updateSituacionesAcademicaDto,
    });
  }

  remove(id: number) {
    return this.prisma.situacionesEducativas.update({
      where: { situacionEducativaId: id },
      data: { estado: false },
    });
  }
}
