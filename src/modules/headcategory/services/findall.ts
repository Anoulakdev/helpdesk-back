import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllHeadCategory(prisma: PrismaService) {
  return prisma.headCategory.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      department: true,
      division: true,
    },
  });
}
