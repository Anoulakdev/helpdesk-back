import { Injectable } from '@nestjs/common';
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto';
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createHeadCategory } from './services/create';
import { findAllHeadCategory } from './services/findall';
import { findOneHeadCategory } from './services/findone';
import { updateHeadCategory } from './services/update';
import { removeHeadCategory } from './services/remove';
import { selectHeadcategory } from './services/selectHeadcategory';

@Injectable()
export class HeadcategoryService {
  constructor(private prisma: PrismaService) {}

  create(createHeadcategoryDto: CreateHeadcategoryDto) {
    return createHeadCategory(this.prisma, createHeadcategoryDto);
  }

  findAll() {
    return findAllHeadCategory(this.prisma);
  }

  selectHeadcategory(user: AuthUser) {
    return selectHeadcategory(this.prisma, user);
  }

  findOne(id: number) {
    return findOneHeadCategory(this.prisma, id);
  }

  update(id: number, updateHeadcategoryDto: UpdateHeadcategoryDto) {
    return updateHeadCategory(this.prisma, id, updateHeadcategoryDto);
  }

  remove(id: number) {
    return removeHeadCategory(this.prisma, id);
  }
}
