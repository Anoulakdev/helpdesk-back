import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeBrand(prisma: PrismaService, id: number) {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw new NotFoundException('brand not found');

  await prisma.brand.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'brand deleted successfully',
  };
}
