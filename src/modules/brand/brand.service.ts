import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createBrand } from './services/create';
import { findAllBrand } from './services/findall';
import { findOneBrand } from './services/findone';
import { updateBrand } from './services/update';
import { removeBrand } from './services/remove';
import { selectBrand } from './services/selectBrand';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createBrandDto: CreateBrandDto) {
    return createBrand(this.prisma, user, createBrandDto);
  }

  findAll(user: AuthUser) {
    return findAllBrand(this.prisma, user);
  }

  selectBrand(typeDeviceId?: number) {
    return selectBrand(this.prisma, typeDeviceId);
  }

  findOne(id: number) {
    return findOneBrand(this.prisma, id);
  }

  update(id: number, user: AuthUser, updateBrandDto: UpdateBrandDto) {
    return updateBrand(this.prisma, id, user, updateBrandDto);
  }

  remove(id: number) {
    return removeBrand(this.prisma, id);
  }
}
