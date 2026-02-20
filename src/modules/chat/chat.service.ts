import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createChat } from './services/create';
import { findAllChat } from './services/findall';
import { findOneChat } from './services/findone';
import { updateChat } from './services/update';
import { removeChat } from './services/remove';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createChatDto: CreateChatDto) {
    return createChat(this.prisma, user, createChatDto);
  }

  findAll(helpdeskRequestId: number) {
    return findAllChat(this.prisma, helpdeskRequestId);
  }

  findOne(id: number) {
    return findOneChat(this.prisma, id);
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return updateChat(this.prisma, id, updateChatDto);
  }

  remove(id: number) {
    return removeChat(this.prisma, id);
  }
}
