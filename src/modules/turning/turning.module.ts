import { Module } from '@nestjs/common';
import { TurningService } from './turning.service';
import { TurningController } from './turning.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TurningController],
  providers: [TurningService, PrismaService],
})
export class TurningModule {}
