import { PrismaService } from '../../../prisma/prisma.service';

export async function selectFloor(prisma: PrismaService, buildingId?: number) {
  const where = buildingId ? { buildingId: Number(buildingId) } : undefined;

  return prisma.floor.findMany({
    orderBy: {
      id: 'asc',
    },
    where,
    include: { building: true },
  });
}
