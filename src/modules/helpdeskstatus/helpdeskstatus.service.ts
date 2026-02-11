import { Injectable } from '@nestjs/common';
import { CreateHelpdeskstatusDto } from './dto/create-helpdeskstatus.dto';
import { UpdateHelpdeskstatusDto } from './dto/update-helpdeskstatus.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createHelpdeskStatus } from './services/create';
import { findAllHelpdeskStatus } from './services/findall';
import { findOneHelpdeskStatus } from './services/findone';
import { updateHelpdeskStatus } from './services/update';
import { removeHelpdeskStatus } from './services/remove';
import { selectHelpdeskStatus } from './services/selectHelpdeskStatus';

@Injectable()
export class HelpdeskstatusService {
  constructor(private readonly prisma: PrismaService) {}

  create(createHelpdeskstatusDto: CreateHelpdeskstatusDto) {
    return createHelpdeskStatus(this.prisma, createHelpdeskstatusDto);
  }

  findAll() {
    return findAllHelpdeskStatus(this.prisma);
  }

  selectHelpdeskStatus() {
    return selectHelpdeskStatus(this.prisma);
  }

  findOne(id: number) {
    return findOneHelpdeskStatus(this.prisma, id);
  }

  update(id: number, updateHelpdeskstatusDto: UpdateHelpdeskstatusDto) {
    return updateHelpdeskStatus(this.prisma, id, updateHelpdeskstatusDto);
  }

  remove(id: number) {
    return removeHelpdeskStatus(this.prisma, id);
  }
}
