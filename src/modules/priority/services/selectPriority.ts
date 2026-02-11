import { PrismaService } from '../../../prisma/prisma.service';

export async function selectPriority(prisma: PrismaService) {
  return prisma.priority.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
