import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createBrand(
  prisma: PrismaService,
  user: AuthUser,
  createBrandDto: CreateBrandDto,
) {
  return prisma.brand.create({
    data: {
      ...createBrandDto,
      typeDeviceId: Number(createBrandDto.typeDeviceId),
      createdById: user.id,
    },
  });
}
