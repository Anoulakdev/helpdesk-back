import { Injectable } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createFloor } from './services/create';
import { findAllFloor } from './services/findall';
import { findOneFloor } from './services/findone';
import { removeFloor } from './services/remove';
import { updateFloor } from './services/update';
import { selectFloor } from './services/selectFloor';

@Injectable()
export class FloorService {
  constructor(private prisma: PrismaService) {}

  create(createFloorDto: CreateFloorDto) {
    return createFloor(this.prisma, createFloorDto);
  }

  findAll() {
    return findAllFloor(this.prisma);
  }

  selectFloor(buildingId?: number) {
    return selectFloor(this.prisma, buildingId);
  }

  findOne(id: number) {
    return findOneFloor(this.prisma, id);
  }

  update(id: number, updateFloorDto: UpdateFloorDto) {
    return updateFloor(this.prisma, id, updateFloorDto);
  }

  remove(id: number) {
    return removeFloor(this.prisma, id);
  }
}
