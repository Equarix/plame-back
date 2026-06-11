import { Module } from '@nestjs/common';
import { SituacionesAcademicasService } from './situaciones-academicas.service';
import { SituacionesAcademicasController } from './situaciones-academicas.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SituacionesAcademicasController],
  providers: [SituacionesAcademicasService],
})
export class SituacionesAcademicasModule {}
