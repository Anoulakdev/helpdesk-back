import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function adminFindAll(prisma: PrismaService, user: AuthUser) {
  return prisma.user.findMany({
    where: {
      employee: {
        divisionId: user.employee.divisionId,
      },
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
