import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { selectBuilding } from './services/selectBuilding';
import { createBuilding } from './services/create';
import { findAllBuilding } from './services/findall';
import { findOneBuilding } from './services/findone';
import { updateBuilding } from './services/update';
import { removeBuilding } from './services/remove';

@Injectable()
export class BuildingService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createBuildingDto: CreateBuildingDto) {
    return createBuilding(this.prisma, user, createBuildingDto);
  }

  findAll(user: AuthUser) {
    return findAllBuilding(this.prisma, user);
  }

  selectBuilding(user: AuthUser) {
    return selectBuilding(this.prisma, user);
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
