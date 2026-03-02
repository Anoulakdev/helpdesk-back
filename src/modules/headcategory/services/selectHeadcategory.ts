import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectHeadcategory(
  prisma: PrismaService,
  user: AuthUser,
) {
  return prisma.headCategory.findMany({
    where: {
      divisionId: {
        not: user.employee.divisionId,
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}
