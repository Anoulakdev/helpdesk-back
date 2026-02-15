import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneCategory(prisma: PrismaService, id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      headCategory: true,
      catIcon: true,
    },
  });
  if (!category) throw new NotFoundException('category not found');
  return category;
}
