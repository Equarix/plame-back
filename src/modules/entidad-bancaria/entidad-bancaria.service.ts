import { Injectable } from '@nestjs/common';
import { CreateEntidadBancariaDto } from './dto/create-entidad-bancaria.dto';
import { UpdateEntidadBancariaDto } from './dto/update-entidad-bancaria.dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryFindDto } from '../../common/dto/query-find.dto';

@Injectable()
export class EntidadBancariaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEntidadBancariaDto: CreateEntidadBancariaDto) {
    return this.prisma.entidades.create({
      data: createEntidadBancariaDto,
    });
  }

  findAll() {
    return this.prisma.entidades.findMany();
  }

  update(id: number, updateEntidadBancariaDto: UpdateEntidadBancariaDto) {
    return this.prisma.entidades.update({
      where: { entidadId: id },
      data: updateEntidadBancariaDto,
    });
  }

  remove(id: number) {
    return this.prisma.entidades.update({
      where: { entidadId: id },
      data: { status: false },
    });
  }

  findPublic(query: QueryFindDto) {
    const { str } = query;

    return this.prisma.entidades.findMany({
      where: {
        status: true,
        name: {
          contains: str,
          mode: 'insensitive',
        },
      },
      take: 10,
    });
  }
}
