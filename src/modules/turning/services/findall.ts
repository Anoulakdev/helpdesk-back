import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllTurning(prisma: PrismaService) {
  return prisma.turning.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
