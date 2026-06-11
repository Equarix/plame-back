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
import { EntidadBancariaService } from './entidad-bancaria.service';
import { CreateEntidadBancariaDto } from './dto/create-entidad-bancaria.dto';
import { UpdateEntidadBancariaDto } from './dto/update-entidad-bancaria.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { Role } from '../../generated/prisma/enums';
import { QueryFindDto } from '../../common/dto/query-find.dto';

@Controller('entidad-bancaria')
export class EntidadBancariaController {
  constructor(
    private readonly entidadBancariaService: EntidadBancariaService,
  ) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createEntidadBancariaDto: CreateEntidadBancariaDto) {
    return this.entidadBancariaService.create(createEntidadBancariaDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll() {
    return this.entidadBancariaService.findAll();
  }

  @Auth([Role.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntidadBancariaDto: UpdateEntidadBancariaDto,
  ) {
    return this.entidadBancariaService.update(+id, updateEntidadBancariaDto);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadBancariaService.remove(+id);
  }

  @Auth()
  @Get('public')
  findPublic(@Query() query: QueryFindDto) {
    return this.entidadBancariaService.findPublic(query);
  }
}
