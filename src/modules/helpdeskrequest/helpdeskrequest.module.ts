import { Module } from '@nestjs/common';
import { HelpdeskrequestService } from './helpdeskrequest.service';
import { HelpdeskrequestController } from './helpdeskrequest.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [HelpdeskrequestController],
  providers: [HelpdeskrequestService, PrismaService],
})
export class HelpdeskrequestModule {}
