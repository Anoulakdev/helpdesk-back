import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllCategory(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  const categories = await prisma.category.findMany({
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

  return categories.map((category) => ({
    ...category,
    createdAt: moment(category.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(category.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
