import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function findAllChat(
  prisma: PrismaService,
  helpdeskRequestId: number,
) {
  if (!helpdeskRequestId || isNaN(Number(helpdeskRequestId))) {
    throw new BadRequestException(
      'helpdeskRequestId is required. Please provide helpdeskRequestId.',
    );
  }
  const chats = await prisma.chat.findMany({
    where: { helpdeskRequestId: Number(helpdeskRequestId) },
    orderBy: {
      id: 'desc',
    },
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
  return chats.map((chat) => ({
    ...chat,
    createdAt: moment(chat.createdAt).tz('Asia/Vientiane').format(),
  }));
}
