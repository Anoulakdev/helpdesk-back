import { PrismaService } from '../../../prisma/prisma.service';

export async function selectBrand(
  prisma: PrismaService,
  typeDeviceId?: number,
) {
  const where = typeDeviceId
    ? { typeDeviceId: Number(typeDeviceId) }
    : undefined;

  return prisma.brand.findMany({
    orderBy: {
      id: 'asc',
    },
    where,
    include: { typeDevice: true },
  });
}
