import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

export async function countCategory(prisma: PrismaService, user: AuthUser) {
  const where: Prisma.CategoryWhereInput = {
    ...(user.roleId === 2 && {
      headCategory: {
        divisionId: user.employee?.divisionId,
      },
    }),
  };

  const count = await prisma.category.count({
    where,
  });

  return {
    count,
  };
}
