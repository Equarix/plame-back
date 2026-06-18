import { Module } from '@nestjs/common';
import { PlameService } from './plame.service';
import { PlameController } from './plame.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [PlameController],
  providers: [PlameService, PrismaService],
  exports: [PlameService],
})
export class PlameModule {}
