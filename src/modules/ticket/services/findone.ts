import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneTicket(prisma: PrismaService, id: number) {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          title: true,
          description: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              gender: true,
            },
          },
        },
      },
    },
  });
  if (!ticket) throw new NotFoundException('ticket not found');
  return {
    ...ticket,
    createdAt: moment(ticket.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(ticket.updatedAt).tz('Asia/Vientiane').format(),
  };
}
