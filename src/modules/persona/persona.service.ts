import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryPersonaDto } from './dto/query-persona.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonaDto: CreatePersonaDto) {
    const { direccion, ...personaData } = createPersonaDto;

    const persona = await this.prisma.persona.create({
      data: personaData,
    });

    const { departamentoId, provinciaId, distritoId, ...rest } = direccion;
    const newDireccion = await this.prisma.direccion.create({
      data: {
        ...rest,
        personaId: persona.personaId,
        departamentoId,
        provinciaId,
        distritoId,
      },
    });

    return {
      ...persona,
      direcciones: [newDireccion],
    };
  }

  async findAll(query: QueryPersonaDto) {
    const { page, limit, dni } = query;

    const where = dni
      ? {
          dni: {
            contains: dni,
          },
        }
      : {};

    const [data, count] = await this.prisma.$transaction([
      this.prisma.persona.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          direcciones: {
            include: {
              departamento: true,
              provincia: true,
              distrito: true,
            },
          },
        },
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
      include: {
        direcciones: {
          include: {
            departamento: true,
            provincia: true,
            distrito: true,
          },
        },
      },
    });
    if (!persona) {
      throw new NotFoundException('Persona not found');
    }

    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const { direccion, ...personaData } = updatePersonaDto;

    return this.prisma.$transaction(async (tx) => {
      await tx.persona.update({
        where: { personaId: id },
        data: {
          ...personaData,
        },
      });

      if (direccion) {
        const existingDireccion = await tx.direccion.findFirst({
          where: { personaId: id },
        });

        if (existingDireccion) {
          await tx.direccion.update({
            where: { direccionId: existingDireccion.direccionId },
            data: direccion,
          });
        } else {
          await tx.direccion.create({
            data: {
              ...direccion,
              personaId: id,
              personaPersonaId: id,
            },
          });
        }
      }

      return {
        ...personaData,
        direccion,
      };
    });
  }

  remove(id: number) {
    return this.prisma.persona.update({
      where: { personaId: id },
      data: { estado: false },
    });
  }
}
