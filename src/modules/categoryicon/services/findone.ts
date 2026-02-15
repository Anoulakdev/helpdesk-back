import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneCategoryIcon(prisma: PrismaService, id: number) {
  const categoryicon = await prisma.categoryIcon.findUnique({
    where: { id },
  });
  if (!categoryicon) throw new NotFoundException('categoryicon not found');
  return categoryicon;
}
