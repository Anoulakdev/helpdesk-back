import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

export async function countRepair(prisma: PrismaService, user: AuthUser) {
  const where: Prisma.UserWhereInput = {
    roleId: {
      in: [2, 3],
    },
    ...(user.roleId === 2 && {
      employee: {
        divisionId: user.employee?.divisionId,
      },
    }),
  };

  const count = await prisma.user.count({
    where,
  });

  return {
    count,
  };
}
