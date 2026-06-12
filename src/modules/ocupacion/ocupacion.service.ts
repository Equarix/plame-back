import { Injectable } from '@nestjs/common';
import { CreateOcupacionDto } from './dto/create-ocupacion.dto';
import { UpdateOcupacionDto } from './dto/update-ocupacion.dto';
import { QueryFindDto } from '../../common/dto/query-find.dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryDto } from '../../common/dto/query.dto';

@Injectable()
export class OcupacionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOcupacionDto: CreateOcupacionDto) {
    return this.prisma.ocupacion.create({
      data: createOcupacionDto,
    });
  }

  async findAll(query: QueryDto) {
    const { page, limit } = query;
    const [data, count] = await this.prisma.$transaction([
      this.prisma.ocupacion.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.ocupacion.count(),
    ]);

    const metadata = {
      totalItems: count,
      itemCount: data.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };

    return { data, metadata };
  }

  update(id: number, updateOcupacionDto: UpdateOcupacionDto) {
    return this.prisma.ocupacion.update({
      where: { ocupacionId: id },
      data: updateOcupacionDto,
    });
  }

  remove(id: number) {
    return this.prisma.ocupacion.update({
      where: { ocupacionId: id },
      data: { status: false },
    });
  }

  findPublic(query: QueryFindDto) {
    const { str } = query;

    return this.prisma.ocupacion.findMany({
      where: {
        status: true,
        name: {
          contains: str,
        },
      },
      take: 10,
    });
  }
}
