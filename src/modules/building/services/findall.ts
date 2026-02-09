import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllBuildings(prisma: PrismaService) {
  return prisma.building.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
