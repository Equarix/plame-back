import { Controller, Post, Body, Patch, Param, Get, Query } from '@nestjs/common';
import { PlameService } from './plame.service';
import { SyncPlameDto, UpdatePlameDetalleDto, UpdatePlameDeclaracionDto } from './dto/plame.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';

@Auth()
@Controller('plame')
export class PlameController {
  constructor(private readonly plameService: PlameService) {}

  @Post('find-or-create')
  findOrCreate(@Body() syncDto: SyncPlameDto) {
    return this.plameService.findOrCreate(syncDto);
  }

  @Post('sync')
  syncTRegistro(@Body() syncDto: SyncPlameDto) {
    return this.plameService.syncTRegistro(syncDto);
  }

  @Patch('detalle/:id')
  updateDetalle(@Param('id') id: string, @Body() dto: UpdatePlameDetalleDto) {
    return this.plameService.updateDetalle(+id, dto);
  }

  @Patch(':id')
  updateDeclaracion(@Param('id') id: string, @Body() dto: UpdatePlameDeclaracionDto) {
    return this.plameService.updateDeclaracion(+id, dto);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.plameService.findAllByCompany(+companyId);
  }
}
