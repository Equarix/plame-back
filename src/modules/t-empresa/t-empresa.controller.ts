import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TEmpresaService } from './t-empresa.service';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { Role } from '../../generated/prisma/enums';
import { QueryDto } from '../../common/dto/query.dto';
import { TEmpresaDto } from './dto/t-empresa.dto';

@Controller('t-empresa')
export class TEmpresaController {
  constructor(private readonly tEmpresaService: TEmpresaService) {}

  @Auth([Role.ADMIN])
  @Get()
  async getTEmpresa(@Query() query: QueryDto) {
    return this.tEmpresaService.getTEmpresa(query);
  }

  @Auth([Role.ADMIN])
  @Post()
  async createTEmpresa(@Body() data: TEmpresaDto) {
    return this.tEmpresaService.createTEmpresa(data);
  }

  @Auth([Role.ADMIN])
  @Put(':id')
  async updateTEmpresa(@Param('id') id: number, @Body() data: TEmpresaDto) {
    return this.tEmpresaService.updateTEmpresa(id, data);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  async deleteTEmpresa(@Param('id') id: number) {
    return this.tEmpresaService.deleteTEmpresa(id);
  }

  @Auth()
  @Get('public')
  async getPublicTEmpresa() {
    return this.tEmpresaService.getPublicTEmpresa();
  }
}
