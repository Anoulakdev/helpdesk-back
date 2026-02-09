import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllFloor(prisma: PrismaService) {
  return prisma.floor.findMany({
    orderBy: {
      id: 'asc',
    },
    include: { building: true },
  });
}
