import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

export async function getNoti(prisma: PrismaService, user: AuthUser) {
  const where: Prisma.ChatWhereInput = {
    ...(user.roleId === 2 && {
      helpdeskRequest: {
        ticket: {
          category: {
            headCategory: {
              divisionId: user.employee?.divisionId,
            },
          },
        },
      },
    }),
  };

  return prisma.chat.findMany({
    where,
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          employee: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 5,
  });
}
