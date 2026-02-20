import { PrismaService } from '../../../prisma/prisma.service';

export async function selectCategoryIcon(prisma: PrismaService) {
  return prisma.categoryIcon.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
