import { PrismaService } from '../../../prisma/prisma.service';

export async function staffHelpdeskStatus(prisma: PrismaService) {
  return prisma.helpdeskStatus.findMany({
    where: {
      id: {
        in: [4, 5, 6, 8],
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}
