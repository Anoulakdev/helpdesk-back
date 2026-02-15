import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function findAllTicket(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  return prisma.ticket.findMany({
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
      category: true,
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
}
