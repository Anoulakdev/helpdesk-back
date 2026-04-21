import { Injectable } from '@nestjs/common';
import { CreateTypedeviceDto } from './dto/create-typedevice.dto';
import { UpdateTypedeviceDto } from './dto/update-typedevice.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createTypeDevice } from './services/create';
import { findAllTypeDevice } from './services/findall';
import { findOneTypeDevice } from './services/findone';
import { updateTypeDevice } from './services/update';
import { removeTypeDevice } from './services/remove';
import { selectTypeDevice } from './services/selectTypeDevice';

@Injectable()
export class TypedeviceService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createTypedeviceDto: CreateTypedeviceDto) {
    return createTypeDevice(this.prisma, user, createTypedeviceDto);
  }

  findAll(user: AuthUser) {
    return findAllTypeDevice(this.prisma, user);
  }

  selectTypeDevice(user: AuthUser, ticketId: number) {
    return selectTypeDevice(this.prisma, user, ticketId);
  }

  findOne(id: number) {
    return findOneTypeDevice(this.prisma, id);
  }

  update(id: number, user: AuthUser, updateTypedeviceDto: UpdateTypedeviceDto) {
    return updateTypeDevice(this.prisma, id, user, updateTypedeviceDto);
  }

  remove(id: number) {
    return removeTypeDevice(this.prisma, id);
  }
}
