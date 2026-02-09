import { PrismaService } from '../../../prisma/prisma.service';

export async function selectBuilding(prisma: PrismaService) {
  return prisma.building.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
