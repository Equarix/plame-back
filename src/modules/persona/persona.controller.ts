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
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { Role } from '../../generated/prisma/enums';
import { QueryPersonaDto } from './dto/query-persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Auth()
  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll(@Query() query: QueryPersonaDto) {
    return this.personaService.findAll(query);
  }

  @Auth()
  @Get('/dni/:dni')
  findOne(@Param('dni') dni: string) {
    return this.personaService.findOne(dni);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
