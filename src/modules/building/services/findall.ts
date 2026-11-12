import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function findAllBuilding(prisma: PrismaService, user: AuthUser) {
  if (user.roleId === 1) {
    return prisma.building.findMany({
      where: {
        divisionId: null,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  if (user.roleId === 2 && user.employee?.division?.branch_id === 2) {
    return prisma.building.findMany({
      where: {
        divisionId: user.employee.divisionId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  return [];
}
