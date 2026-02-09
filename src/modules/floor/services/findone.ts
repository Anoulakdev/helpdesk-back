import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneFloor(prisma: PrismaService, id: number) {
  const floor = await prisma.floor.findUnique({
    where: { id },
    include: { building: true },
  });
  if (!floor) throw new NotFoundException('floor not found');
  return floor;
}
