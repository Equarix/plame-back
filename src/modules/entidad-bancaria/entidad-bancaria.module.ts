import { Module } from '@nestjs/common';
import { EntidadBancariaService } from './entidad-bancaria.service';
import { EntidadBancariaController } from './entidad-bancaria.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntidadBancariaController],
  providers: [EntidadBancariaService],
})
export class EntidadBancariaModule {}
