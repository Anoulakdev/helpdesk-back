import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function findAllBrand(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  return prisma.brand.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      typeDevice: {
        headCategory: {
          divisionId: user.employee.divisionId,
        },
      },
    },
    include: { typeDevice: true },
  });
}
