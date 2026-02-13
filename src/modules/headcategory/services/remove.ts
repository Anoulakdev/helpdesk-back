import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeHeadCategory(prisma: PrismaService, id: number) {
  const headcategory = await prisma.headCategory.findUnique({ where: { id } });
  if (!headcategory) throw new NotFoundException('headcategory not found');

  await prisma.headCategory.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'headcategory deleted successfully',
  };
}
