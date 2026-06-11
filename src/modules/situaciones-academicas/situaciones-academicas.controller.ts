import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SituacionesAcademicasService } from './situaciones-academicas.service';
import { CreateSituacionesAcademicaDto } from './dto/create-situaciones-academica.dto';
import { UpdateSituacionesAcademicaDto } from './dto/update-situaciones-academica.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { Role } from '../../generated/prisma/enums';
import { QueryDto } from '../../common/dto/query.dto';

@Controller('situaciones-academicas')
export class SituacionesAcademicasController {
  constructor(
    private readonly situacionesAcademicasService: SituacionesAcademicasService,
  ) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createSituacionesAcademicaDto: CreateSituacionesAcademicaDto) {
    return this.situacionesAcademicasService.create(
      createSituacionesAcademicaDto,
    );
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.situacionesAcademicasService.findAll(query);
  }

  @Auth([Role.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSituacionesAcademicaDto: UpdateSituacionesAcademicaDto,
  ) {
    return this.situacionesAcademicasService.update(
      +id,
      updateSituacionesAcademicaDto,
    );
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situacionesAcademicasService.remove(+id);
  }
}
