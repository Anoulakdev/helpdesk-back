import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createPriority } from './services/create';
import { findAllPriority } from './services/findall';
import { findOnePriority } from './services/findone';
import { updatePriority } from './services/update';
import { removePriority } from './services/remove';
import { selectPriority } from './services/selectPriority';

@Injectable()
export class PriorityService {
  constructor(private prisma: PrismaService) {}

  create(createPriorityDto: CreatePriorityDto) {
    return createPriority(this.prisma, createPriorityDto);
  }

  findAll() {
    return findAllPriority(this.prisma);
  }

  findOne(id: number) {
    return findOnePriority(this.prisma, id);
  }

  update(id: number, updatePriorityDto: UpdatePriorityDto) {
    return updatePriority(this.prisma, id, updatePriorityDto);
  }

  remove(id: number) {
    return removePriority(this.prisma, id);
  }

  selectPriority() {
    return selectPriority(this.prisma);
  }
}
