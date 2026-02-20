import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function adminAssign(prisma: PrismaService, user: AuthUser) {
  return prisma.user.findMany({
    where: {
      employee: {
        divisionId: user.employee.divisionId,
      },
      roleId: 3,
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      username: true,
      employeeId: true,
      roleId: true,
      role: true,
      employee: {
        include: {
          department: true,
          division: true,
          office: true,
          unit: true,
          position: true,
        },
      },
    },
  });
}
