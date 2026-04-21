import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneBrand(prisma: PrismaService, id: number) {
  const brand = await prisma.brand.findUnique({
    where: { id },
    include: { typeDevice: true },
  });
  if (!brand) throw new NotFoundException('brand not found');
  return brand;
}
