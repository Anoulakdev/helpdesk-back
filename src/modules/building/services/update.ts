import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateBuildingDto } from '../dto/update-building.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateBuilding(
  prisma: PrismaService,
  id: number,
  updateBuildingDto: UpdateBuildingDto,
) {
  const building = await prisma.building.findUnique({ where: { id } });
  if (!building) throw new NotFoundException('building not found');

  return prisma.building.update({
    where: { id },
    data: updateBuildingDto,
  });
}
