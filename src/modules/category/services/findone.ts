import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneCategory(prisma: PrismaService, id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      headCategory: true,
      catIcon: true,
    },
  });
  if (!category) throw new NotFoundException('category not found');
  return {
    ...category,
    createdAt: moment(category.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(category.updatedAt).tz('Asia/Vientiane').format(),
  };
}
