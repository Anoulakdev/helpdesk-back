import { PrismaService } from '../../../prisma/prisma.service';

export async function selectCategory(
  prisma: PrismaService,
  headCategoryId?: number,
) {
  const where = headCategoryId
    ? { headCategoryId: Number(headCategoryId) }
    : undefined;

  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
    where,
    include: {
      headCategory: true,
      catIcon: true,
    },
  });
}
