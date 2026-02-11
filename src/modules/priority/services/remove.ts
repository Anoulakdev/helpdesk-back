import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removePriority(prisma: PrismaService, id: number) {
  const priority = await prisma.priority.findUnique({ where: { id } });
  if (!priority) throw new NotFoundException('priority not found');

  await prisma.priority.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'priority deleted successfully',
  };
}
