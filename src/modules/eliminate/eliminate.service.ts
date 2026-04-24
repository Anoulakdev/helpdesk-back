import { Injectable } from '@nestjs/common';
import { CreateEliminateDto } from './dto/create-eliminate.dto';
import { UpdateEliminateDto } from './dto/update-eliminate.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createEliminate } from './services/create';
import { FindAllEliminate } from './services/findall';
import { findOneEliminate } from './services/findone';
import { updateEliminate } from './services/update';
import { removeEliminate } from './services/remove';

@Injectable()
export class EliminateService {
  constructor(private prisma: PrismaService) {}

  create(
    createEliminateDto: CreateEliminateDto,
    user: AuthUser,
    Eliminatefilename: string,
  ) {
    return createEliminate(
      this.prisma,
      user,
      createEliminateDto,
      Eliminatefilename,
    );
  }

  findAll(user: AuthUser) {
    return FindAllEliminate(this.prisma, user);
  }

  findOne(id: number) {
    return findOneEliminate(this.prisma, id);
  }

  update(id: number, user: AuthUser, updateEliminateDto: UpdateEliminateDto) {
    return updateEliminate(this.prisma, id, user, updateEliminateDto);
  }

  remove(id: number) {
    return removeEliminate(this.prisma, id);
  }
}
