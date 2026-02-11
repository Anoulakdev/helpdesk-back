import { Module } from '@nestjs/common';
import { HelpdeskstatusService } from './helpdeskstatus.service';
import { HelpdeskstatusController } from './helpdeskstatus.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [HelpdeskstatusController],
  providers: [HelpdeskstatusService, PrismaService],
})
export class HelpdeskstatusModule {}
