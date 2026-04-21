import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateTypedeviceDto } from '../dto/update-typedevice.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateTypeDevice(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateTypeDeviceDto: UpdateTypedeviceDto,
) {
  const typedevice = await prisma.typeDevice.findUnique({ where: { id } });
  if (!typedevice) throw new NotFoundException('type device not found');

  return prisma.typeDevice.update({
    where: { id },
    data: {
      ...updateTypeDeviceDto,
      createdById: user.id,
    },
  });
}
