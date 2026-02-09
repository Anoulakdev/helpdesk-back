import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectBuilding } from './services/selectBuilding';
import { createBuilding } from './services/create';
import { findAllBuildings } from './services/findall';
import { findOneBuilding } from './services/findone';
import { updateBuilding } from './services/update';
import { removeBuilding } from './services/remove';

@Injectable()
export class BuildingService {
  constructor(private prisma: PrismaService) {}

  create(createBuildingDto: CreateBuildingDto) {
    return createBuilding(this.prisma, createBuildingDto);
  }

  findAll() {
    return findAllBuildings(this.prisma);
  }

  selectBuilding() {
    return selectBuilding(this.prisma);
  }

  findOne(id: number) {
    return findOneBuilding(this.prisma, id);
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return updateBuilding(this.prisma, id, updateBuildingDto);
  }

  remove(id: number) {
    return removeBuilding(this.prisma, id);
  }
}
