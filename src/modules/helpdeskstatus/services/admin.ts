import { PrismaService } from '../../../prisma/prisma.service';

export async function adminHelpdeskStatus(prisma: PrismaService) {
  return prisma.helpdeskStatus.findMany({
    where: {
      id: {
        in: [4, 5, 6, 7, 8, 9],
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}
