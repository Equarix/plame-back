import { Module } from '@nestjs/common';
import { TPersonaService } from './t-persona.service';
import { TPersonaController } from './t-persona.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TPersonaController],
  providers: [TPersonaService],
})
export class TPersonaModule {}
