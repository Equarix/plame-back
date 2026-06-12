import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TPersonaService } from './t-persona.service';
import { CreateTPersonaDto } from './dto/create-t-persona.dto';
import { UpdateTPersonaDto } from './dto/update-t-persona.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';

@Auth()
@Controller('t-persona')
export class TPersonaController {
  constructor(private readonly tPersonaService: TPersonaService) {}

  @Post()
  create(@Body() createTPersonaDto: CreateTPersonaDto) {
    return this.tPersonaService.create(createTPersonaDto);
  }

  @Get('company/:companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.tPersonaService.findAll(+companyId);
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.tPersonaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTPersonaDto: UpdateTPersonaDto,
  ) {
    return this.tPersonaService.update(+id, updateTPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tPersonaService.remove(+id);
  }
}
