import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllTypeDevice(prisma: PrismaService, user: AuthUser) {
  if (!user.employee?.divisionId) {
    throw new BadRequestException('User division not found');
  }
  const typedevices = await prisma.typeDevice.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      headCategory: {
        divisionId: user.employee.divisionId,
      },
    },
  });

  return typedevices.map((typedevice) => ({
    ...typedevice,
    createdAt: moment(typedevice.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(typedevice.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
