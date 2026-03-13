import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectCategory(
  prisma: PrismaService,
  user: AuthUser,
  headCategoryId?: number,
) {
  const where = {
    ...(headCategoryId && { headCategoryId: Number(headCategoryId) }),
    headCategory:
      user.employee.division?.branch_id === 1
        ? {
            divisionId: {
              not: user.employee.divisionId,
            },
            division: {
              branch_id: {
                not: 2,
              },
            },
          }
        : { divisionId: user.employee.divisionId },
  };

  return prisma.category.findMany({
    where,
    orderBy: {
      headCategory: {
        id: 'asc',
      },
    },
    include: {
      headCategory: {
        include: {
          division: true,
        },
      },
      catIcon: true,
    },
  });
}
