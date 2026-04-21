import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTypedeviceDto } from '../dto/create-typedevice.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createTypeDevice(
  prisma: PrismaService,
  user: AuthUser,
  createTypedeviceDto: CreateTypedeviceDto,
) {
  const headcategory = await prisma.headCategory.findFirst({
    where: { divisionId: user.employee.divisionId },
    select: { id: true },
  });
  if (!headcategory) throw new NotFoundException('headcategory not found');

  return prisma.typeDevice.create({
    data: {
      ...createTypedeviceDto,
      headCategoryId: headcategory.id,
      createdById: user.id,
    },
  });
}
