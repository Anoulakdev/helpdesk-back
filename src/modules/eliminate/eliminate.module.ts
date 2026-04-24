import { Module } from '@nestjs/common';
import { EliminateService } from './eliminate.service';
import { EliminateController } from './eliminate.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EliminateController],
  providers: [EliminateService, PrismaService],
})
export class EliminateModule {}
