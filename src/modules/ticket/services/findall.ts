import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllTicket(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      category: {
        headCategory: {
          divisionId: user.employee.divisionId,
        },
      },
    },
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

  return tickets.map((ticket) => ({
    ...ticket,
    createdAt: moment(ticket.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(ticket.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
