import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllPriority(prisma: PrismaService) {
  return prisma.priority.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
