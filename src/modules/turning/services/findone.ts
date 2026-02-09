import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneTurning(prisma: PrismaService, id: number) {
  const turning = await prisma.turning.findUnique({ where: { id } });
  if (!turning) throw new NotFoundException('turning not found');
  return turning;
}
