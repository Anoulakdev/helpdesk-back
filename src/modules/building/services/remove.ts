import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeBuilding(prisma: PrismaService, id: number) {
  const building = await prisma.building.findUnique({ where: { id } });
  if (!building) throw new NotFoundException('building not found');

  await prisma.building.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'building deleted successfully',
  };
}
