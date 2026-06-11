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
import { OcupacionService } from './ocupacion.service';
import { CreateOcupacionDto } from './dto/create-ocupacion.dto';
import { UpdateOcupacionDto } from './dto/update-ocupacion.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { Role } from '../../generated/prisma/enums';
import { QueryFindDto } from '../../common/dto/query-find.dto';
import { QueryDto } from '../../common/dto/query.dto';

@Controller('ocupacion')
export class OcupacionController {
  constructor(private readonly ocupacionService: OcupacionService) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createOcupacionDto: CreateOcupacionDto) {
    return this.ocupacionService.create(createOcupacionDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.ocupacionService.findAll(query);
  }

  @Auth([Role.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOcupacionDto: UpdateOcupacionDto,
  ) {
    return this.ocupacionService.update(+id, updateOcupacionDto);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ocupacionService.remove(+id);
  }

  @Auth()
  @Get('public')
  findPublic(@Query() query: QueryFindDto) {
    return this.ocupacionService.findPublic(query);
  }
}
