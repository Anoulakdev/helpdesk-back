import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function findAllCategory(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      headCategory: {
        divisionId: user.employee.divisionId,
      },
    },
    include: {
      headCategory: true,
      catIcon: true,
    },
  });
}
