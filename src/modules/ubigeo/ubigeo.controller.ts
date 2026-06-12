import { Controller, Get, Param } from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { Auth } from '../../common/decorator/auth/auth.decorator';

@Auth()
@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @Get('departamentos')
  getDepartamentos() {
    return this.ubigeoService.getDepartamentos();
  }

  @Get('provincias/:departamentoId')
  getProvincias(@Param('departamentoId') departamentoId: string) {
    return this.ubigeoService.getProvincias(+departamentoId);
  }

  @Get('distritos/:provinciaId')
  getDistritos(@Param('provinciaId') provinciaId: string) {
    return this.ubigeoService.getDistritos(+provinciaId);
  }
}
