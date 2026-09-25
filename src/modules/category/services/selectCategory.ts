import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectCategory(
  prisma: PrismaService,
  user: AuthUser,
  headCategoryId?: number,
) {
  const getHeadCategoryFilter = () => {
    if (user.employee.division?.branch_id === 1) {
      if (user.employee.departmentId === 10) {
        return { divisionId: 185 };
      }
      if (user.employee.departmentId === 11) {
        return { divisionId: 183 };
      }
      if (user.employee.departmentId === 12) {
        return { divisionId: 200 };
      }
      return {
        divisionId: {
          not: user.employee.divisionId,
        },
        division: {
          branch_id: {
            not: 2,
          },
        },
      };
    }
    return { divisionId: user.employee.divisionId };
  };

  const where = {
    ...(headCategoryId && { headCategoryId: Number(headCategoryId) }),
    headCategory: getHeadCategoryFilter(),
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
