import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeCategory(prisma: PrismaService, id: number) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new NotFoundException('category not found');

  await prisma.category.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'category deleted successfully',
  };
}
