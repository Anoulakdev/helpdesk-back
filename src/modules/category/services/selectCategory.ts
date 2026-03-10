import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectCategory(
  prisma: PrismaService,
  user: AuthUser,
  headCategoryId?: number,
) {
  const where = {
    ...(headCategoryId && { headCategoryId: Number(headCategoryId) }),

    headCategory: {
      divisionId: {
        not: user.employee.divisionId,
      },
    },
  };

  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
    where,
    include: {
      headCategory: true,
      catIcon: true,
    },
  });
}
