import { PrismaService } from '../../../prisma/prisma.service';

export async function selectTurning(prisma: PrismaService) {
  return prisma.turning.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
