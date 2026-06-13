import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { QueryPersonaDto } from './dto/query-persona.dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDireccionDto } from '../../common/dto/ubigeo.dto';

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
        personaPersonaId: persona.personaId,
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
          where: { personaPersonaId: id },
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

  async addAddress(personaId: number, createDireccionDto: CreateDireccionDto) {
    const persona = await this.prisma.persona.findUnique({
      where: { personaId },
    });

    if (!persona) {
      throw new NotFoundException(`Persona with ID ${personaId} not found`);
    }

    const { departamentoId, provinciaId, distritoId, ...rest } =
      createDireccionDto;

    const newDireccion = await this.prisma.direccion.create({
      data: {
        ...rest,
        personaPersonaId: persona.personaId,
        departamentoId,
        provinciaId,
        distritoId,
      },
    });

    return newDireccion;
  }

  async editAddress(addressId: number, updateDireccionDto: CreateDireccionDto) {
    const existingDireccion = await this.prisma.direccion.findUnique({
      where: { direccionId: addressId },
    });

    if (!existingDireccion) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    const { departamentoId, provinciaId, distritoId, ...rest } =
      updateDireccionDto;

    const updatedDireccion = await this.prisma.direccion.update({
      where: { direccionId: addressId },
      data: {
        ...rest,
        departamentoId,
        provinciaId,
        distritoId,
      },
    });

    return updatedDireccion;
  }
}
