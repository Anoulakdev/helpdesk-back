import { PrismaService } from '../../../prisma/prisma.service';

export async function selectHeadcategory(prisma: PrismaService) {
  return prisma.headCategory.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
