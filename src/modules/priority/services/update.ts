import { PrismaService } from '../../../prisma/prisma.service';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { NotFoundException } from '@nestjs/common';

export async function updatePriority(
  prisma: PrismaService,
  id: number,
  updatePriorityDto: UpdatePriorityDto,
) {
  const priority = await prisma.priority.findUnique({ where: { id } });
  if (!priority) throw new NotFoundException('priority not found');

  return prisma.priority.update({
    where: { id },
    data: updatePriorityDto,
  });
}
