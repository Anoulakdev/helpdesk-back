import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneTypeDevice(prisma: PrismaService, id: number) {
  const typedevice = await prisma.typeDevice.findUnique({
    where: { id },
  });
  if (!typedevice) throw new NotFoundException('type device not found');
  return {
    ...typedevice,
    createdAt: moment(typedevice.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(typedevice.updatedAt).tz('Asia/Vientiane').format(),
  };
}
