import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

export async function countTicket(prisma: PrismaService, user: AuthUser) {
  const where: Prisma.TicketWhereInput = {
    ...(user.roleId === 2 && {
      category: {
        headCategory: {
          divisionId: user.employee?.divisionId,
        },
      },
    }),
  };

  const count = await prisma.ticket.count({
    where,
  });

  return {
    count,
  };
}
