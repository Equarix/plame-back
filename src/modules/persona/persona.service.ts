import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryPersonaDto } from './dto/query-persona.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPersonaDto: CreatePersonaDto) {
    return this.prisma.persona.create({
      data: createPersonaDto,
    });
  }

  async findAll(query: QueryPersonaDto) {
    const { page, limit, dni } = query;

    const where = dni
      ? {
          dni: {
            contains: dni,
            mode: 'insensitive',
          },
        }
      : {};

    const [data, count] = await this.prisma.$transaction([
      this.prisma.persona.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.persona.count({ where }),
    ]);

    const metadata = {
      totalItems: count,
      itemCount: data.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };

    return { data, metadata };
  }

  async findOne(dni: string) {
    const persona = await this.prisma.persona.findFirst({
      where: { dni },
    });
    if (!persona) {
      throw new NotFoundException('Persona not found');
    }

    return persona;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return this.prisma.persona.update({
      where: { personaId: id },
      data: updatePersonaDto,
    });
  }

  remove(id: number) {
    return this.prisma.persona.update({
      where: { personaId: id },
      data: { status: false },
    });
  }
}
