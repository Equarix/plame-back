import { Module } from '@nestjs/common';
import { TEmpresaService } from './t-empresa.service';
import { TEmpresaController } from './t-empresa.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TEmpresaController],
  providers: [TEmpresaService],
})
export class TEmpresaModule {}
