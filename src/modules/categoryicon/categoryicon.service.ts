import { Injectable } from '@nestjs/common';
import { CreateCategoryiconDto } from './dto/create-categoryicon.dto';
import { UpdateCategoryiconDto } from './dto/update-categoryicon.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createCategoryIcon } from './services/create';
import { findAllCategoryIcon } from './services/findall';
import { findOneCategoryIcon } from './services/findone';
import { updateCategoryIcon } from './services/update';
import { removeCategoryIcon } from './services/remove';
import { selectCategoryIcon } from './services/selectCategoryicon';

@Injectable()
export class CategoryiconService {
  constructor(private prisma: PrismaService) {}

  create(
    createCategoryiconDto: CreateCategoryiconDto,
    CatIconfilename: string,
  ) {
    return createCategoryIcon(
      this.prisma,
      createCategoryiconDto,
      CatIconfilename,
    );
  }

  findAll() {
    return findAllCategoryIcon(this.prisma);
  }

  selectCategoryIcon() {
    return selectCategoryIcon(this.prisma);
  }

  async findOne(id: number) {
    return findOneCategoryIcon(this.prisma, id);
  }

  update(id: number, updateCategoryiconDto: UpdateCategoryiconDto) {
    return updateCategoryIcon(this.prisma, id, updateCategoryiconDto);
  }

  remove(id: number) {
    return removeCategoryIcon(this.prisma, id);
  }
}
