import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectBuilding(
  prisma: PrismaService,
  user: AuthUser,
) {
  let divisionFilter: number | null = null;

  if (user.employee?.division?.branch_id === 1) {
    if (user.employee.departmentId === 10) {
      divisionFilter = 185;
    } else if (user.employee.departmentId === 11) {
      divisionFilter = 183;
    } else if (user.employee.departmentId === 12) {
      divisionFilter = 200;
    } else {
      divisionFilter = null;
    }
  } else if (user.employee?.division?.branch_id === 2) {
    divisionFilter = user.employee.divisionId;
  } else {
    return [];
  }

  return prisma.building.findMany({
    where: {
      divisionId: divisionFilter,
    },
    orderBy: {
      id: 'asc',
    },
  });
}
