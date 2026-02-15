import { Module } from '@nestjs/common';
import { CategoryiconService } from './categoryicon.service';
import { CategoryiconController } from './categoryicon.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CategoryiconController],
  providers: [CategoryiconService, PrismaService],
})
export class CategoryiconModule {}
