import { Module } from '@nestjs/common';
import { HeadcategoryService } from './headcategory.service';
import { HeadcategoryController } from './headcategory.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [HeadcategoryController],
  providers: [HeadcategoryService, PrismaService],
})
export class HeadcategoryModule {}
