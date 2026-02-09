import { Injectable } from '@nestjs/common';
import { CreateTurningDto } from './dto/create-turning.dto';
import { UpdateTurningDto } from './dto/update-turning.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createTurning } from './services/create';
import { findAllTurning } from './services/findall';
import { findOneTurning } from './services/findone';
import { updateTurning } from './services/update';
import { removeTurning } from './services/remove';
import { selectTurning } from './services/selectTurning';

@Injectable()
export class TurningService {
  constructor(private prisma: PrismaService) {}

  create(createTurningDto: CreateTurningDto) {
    return createTurning(this.prisma, createTurningDto);
  }

  findAll() {
    return findAllTurning(this.prisma);
  }

  selectTurning() {
    return selectTurning(this.prisma);
  }

  findOne(id: number) {
    return findOneTurning(this.prisma, id);
  }

  update(id: number, updateTurningDto: UpdateTurningDto) {
    return updateTurning(this.prisma, id, updateTurningDto);
  }

  remove(id: number) {
    return removeTurning(this.prisma, id);
  }
}
