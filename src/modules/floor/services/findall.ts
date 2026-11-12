import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function findAllFloor(prisma: PrismaService, user: AuthUser) {
  if (user.roleId === 1) {
    return prisma.floor.findMany({
      where: {
        building: {
          divisionId: null,
        },
      },
      orderBy: {
        id: 'asc',
      },
      include: { building: true },
    });
  }

  if (user.roleId === 2 && user.employee?.division?.branch_id === 2) {
    return prisma.floor.findMany({
      where: {
        building: {
          divisionId: user.employee.divisionId,
        },
      },
      orderBy: {
        id: 'asc',
      },
      include: { building: true },
    });
  }

  return [];
}
