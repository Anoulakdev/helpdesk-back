import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeTypeDevice(prisma: PrismaService, id: number) {
  const typedevice = await prisma.typeDevice.findUnique({ where: { id } });
  if (!typedevice) throw new NotFoundException('type device not found');

  await prisma.typeDevice.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'type device deleted successfully',
  };
}
