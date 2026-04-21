import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateBrand(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateBrandDto: UpdateBrandDto,
) {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw new NotFoundException('brand not found');

  return prisma.brand.update({
    where: { id },
    data: {
      ...updateBrandDto,
      typeDeviceId: Number(updateBrandDto.typeDeviceId),
      createdById: user.id,
    },
  });
}
