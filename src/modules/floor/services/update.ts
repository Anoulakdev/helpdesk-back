import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateFloorDto } from '../dto/update-floor.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateFloor(
  prisma: PrismaService,
  id: number,
  updateFloorDto: UpdateFloorDto,
) {
  const floor = await prisma.floor.findUnique({ where: { id } });
  if (!floor) throw new NotFoundException('floor not found');

  return prisma.floor.update({
    where: { id },
    data: {
      ...updateFloorDto,
      buildingId: Number(updateFloorDto.buildingId),
    },
  });
}
