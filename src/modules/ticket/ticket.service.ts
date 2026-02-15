import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createTicket } from './services/create';
import { findAllTicket } from './services/findall';
import { findOneTicket } from './services/findone';
import { updateTicket } from './services/update';
import { removeTicket } from './services/remove';
import { selectTicket } from './services/selectTicket';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createTicketDto: CreateTicketDto) {
    return createTicket(this.prisma, user, createTicketDto);
  }

  findAll(user: AuthUser) {
    return findAllTicket(this.prisma, user);
  }

  selectTicket(categoryId?: number) {
    return selectTicket(this.prisma, categoryId);
  }

  findOne(id: number) {
    return findOneTicket(this.prisma, id);
  }

  update(id: number, user: AuthUser, updateTicketDto: UpdateTicketDto) {
    return updateTicket(this.prisma, id, user, updateTicketDto);
  }

  remove(id: number) {
    return removeTicket(this.prisma, id);
  }
}
