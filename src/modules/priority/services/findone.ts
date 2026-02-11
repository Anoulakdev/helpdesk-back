import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOnePriority(prisma: PrismaService, id: number) {
  const priority = await prisma.priority.findUnique({ where: { id } });
  if (!priority) throw new NotFoundException('priority not found');
  return priority;
}
