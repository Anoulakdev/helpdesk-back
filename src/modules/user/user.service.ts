import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { createUser } from './services/create';
import { findAllUser } from './services/findall';
import { findOneUser } from './services/findone';
import { updateUser } from './services/update';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create() {
    return createUser(this.prisma);
  }

  findAll(divisionId?: number) {
    return findAllUser(this.prisma, divisionId);
  }

  findOne(id: number) {
    return findOneUser(this.prisma, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUser(this.prisma, id, updateUserDto);
  }
}
