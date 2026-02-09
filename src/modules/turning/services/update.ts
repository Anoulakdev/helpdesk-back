import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateTurningDto } from '../dto/update-turning.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateTurning(
  prisma: PrismaService,
  id: number,
  updateTurningDto: UpdateTurningDto,
) {
  const turning = await prisma.turning.findUnique({ where: { id } });
  if (!turning) throw new NotFoundException('turning not found');

  return prisma.turning.update({
    where: { id },
    data: updateTurningDto,
  });
}
