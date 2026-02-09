import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeTurning(prisma: PrismaService, id: number) {
  const turning = await prisma.turning.findUnique({ where: { id } });
  if (!turning) throw new NotFoundException('turning not found');

  await prisma.turning.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'turning deleted successfully',
  };
}
