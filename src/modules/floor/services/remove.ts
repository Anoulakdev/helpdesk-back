import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeFloor(prisma: PrismaService, id: number) {
  const floor = await prisma.floor.findUnique({ where: { id } });
  if (!floor) throw new NotFoundException('floor not found');

  await prisma.floor.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'floor deleted successfully',
  };
}
