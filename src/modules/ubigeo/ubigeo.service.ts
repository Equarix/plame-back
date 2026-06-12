import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UbigeoService {
  constructor(private readonly prisma: PrismaService) {}

  getDepartamentos() {
    return this.prisma.departamento.findMany();
  }

  getProvincias(departamentoId: number) {
    return this.prisma.provincia.findMany({
      where: { idDepartamento: departamentoId },
    });
  }

  getDistritos(provinciaId: number) {
    return this.prisma.distrito.findMany({
      where: { idProvincia: provinciaId },
    });
  }
}
