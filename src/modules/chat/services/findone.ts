import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneChat(prisma: PrismaService, id: number) {
  const chat = await prisma.chat.findUnique({
    where: { id },
    include: {
      sender: {
        select: {
          id: true,
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              gender: true,
              emp_code: true,
            },
          },
        },
      },
    },
  });
  if (!chat) throw new NotFoundException('chat not found');
  return {
    ...chat,
    createdAt: moment(chat.createdAt).tz('Asia/Vientiane').format(),
  };
}
