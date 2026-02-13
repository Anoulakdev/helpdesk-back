import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneHeadCategory(prisma: PrismaService, id: number) {
  const headcategory = await prisma.headCategory.findUnique({
    where: { id },
    include: { department: true, division: true },
  });
  if (!headcategory) throw new NotFoundException('headcategory not found');
  return headcategory;
}
