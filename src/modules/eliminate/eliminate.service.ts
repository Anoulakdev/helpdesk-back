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
import { notifyHelpdeskUpdate } from '../../utils/event-bus';

@Injectable()
export class EliminateService {
  constructor(private prisma: PrismaService) {}

  async create(
    createEliminateDto: CreateEliminateDto,
    user: AuthUser,
    Eliminatefilename: string,
  ) {
    const result = await createEliminate(
      this.prisma,
      user,
      createEliminateDto,
      Eliminatefilename,
    );
    notifyHelpdeskUpdate();
    return result;
  }

  findAll(user: AuthUser, page?: number, limit?: number) {
    return FindAllEliminate(this.prisma, user, page, limit);
  }

  findOne(id: number) {
    return findOneEliminate(this.prisma, id);
  }

  async update(
    id: number,
    user: AuthUser,
    updateEliminateDto: UpdateEliminateDto,
  ) {
    const result = await updateEliminate(
      this.prisma,
      id,
      user,
      updateEliminateDto,
    );
    notifyHelpdeskUpdate();
    return result;
  }

  async remove(id: number) {
    const result = await removeEliminate(this.prisma, id);
    notifyHelpdeskUpdate();
    return result;
  }
}
