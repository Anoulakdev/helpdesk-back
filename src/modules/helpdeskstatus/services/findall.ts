import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllHelpdeskStatus(prisma: PrismaService) {
  return prisma.helpdeskStatus.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
