import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneBuilding(prisma: PrismaService, id: number) {
  const building = await prisma.building.findUnique({ where: { id } });
  if (!building) throw new NotFoundException('building not found');
  return building;
}
