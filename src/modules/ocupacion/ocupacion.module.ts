import { Module } from '@nestjs/common';
import { OcupacionService } from './ocupacion.service';
import { OcupacionController } from './ocupacion.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OcupacionController],
  providers: [OcupacionService],
})
export class OcupacionModule {}
