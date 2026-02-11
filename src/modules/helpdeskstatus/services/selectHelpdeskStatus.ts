import { PrismaService } from '../../../prisma/prisma.service';

export async function selectHelpdeskStatus(prisma: PrismaService) {
  return prisma.helpdeskStatus.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
