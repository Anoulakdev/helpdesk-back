import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createCategory } from './services/create';
import { findAllCategory } from './services/findall';
import { findOneCategory } from './services/findone';
import { updateCategory } from './services/update';
import { removeCategory } from './services/remove';
import { selectCategory } from './services/selectCategory';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createCategoryDto: CreateCategoryDto) {
    return createCategory(this.prisma, user, createCategoryDto);
  }

  findAll(user: AuthUser) {
    return findAllCategory(this.prisma, user);
  }

  selectCategory(headCategoryId?: number) {
    return selectCategory(this.prisma, headCategoryId);
  }

  findOne(id: number) {
    return findOneCategory(this.prisma, id);
  }

  update(id: number, user: AuthUser, updateCategoryDto: UpdateCategoryDto) {
    return updateCategory(this.prisma, id, user, updateCategoryDto);
  }

  remove(id: number) {
    return removeCategory(this.prisma, id);
  }
}
