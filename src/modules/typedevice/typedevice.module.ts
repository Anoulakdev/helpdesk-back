import { Module } from '@nestjs/common';
import { TypedeviceService } from './typedevice.service';
import { TypedeviceController } from './typedevice.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TypedeviceController],
  providers: [TypedeviceService, PrismaService],
})
export class TypedeviceModule {}
