import { Injectable } from '@nestjs/common';
import { CreateHelpdeskrequestDto } from './dto/create-helpdeskrequest.dto';
import { UpdateHelpdeskrequestDto } from './dto/update-helpdeskrequest.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createHDRequest } from './services/create';
import { adminFindAll } from './services/adminfindall';
import { userFindAll } from './services/userfindall';
import { findOneHDRequest } from './services/findone';
import { updateHDRequest } from './services/update';
import { removeHDRequest } from './services/remove';

@Injectable()
export class HelpdeskrequestService {
  constructor(private prisma: PrismaService) {}

  create(
    user: AuthUser,
    createHelpdeskrequestDto: CreateHelpdeskrequestDto,
    hdFileName?: string,
    hdImgNames?: string[],
  ) {
    return createHDRequest(
      this.prisma,
      user,
      createHelpdeskrequestDto,
      hdFileName,
      hdImgNames,
    );
  }

  adminFindAll(user: AuthUser, helpdeskStatusId?: number) {
    return adminFindAll(this.prisma, user, helpdeskStatusId);
  }

  userFindAll(user: AuthUser, helpdeskStatusId?: number) {
    return userFindAll(this.prisma, user, helpdeskStatusId);
  }

  findOne(id: number) {
    return findOneHDRequest(this.prisma, id);
  }

  update(id: number, updateHelpdeskrequestDto: UpdateHelpdeskrequestDto) {
    return updateHDRequest(this.prisma, id, updateHelpdeskrequestDto);
  }

  remove(id: number) {
    return removeHDRequest(this.prisma, id);
  }
}
