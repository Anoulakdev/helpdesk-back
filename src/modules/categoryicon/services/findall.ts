import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllCategoryIcon(prisma: PrismaService) {
  return prisma.categoryIcon.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
