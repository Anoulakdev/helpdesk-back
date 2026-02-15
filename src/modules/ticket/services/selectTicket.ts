import { PrismaService } from '../../../prisma/prisma.service';

export async function selectTicket(prisma: PrismaService, categoryId?: number) {
  const where = categoryId ? { categoryId: Number(categoryId) } : undefined;

  return prisma.ticket.findMany({
    orderBy: {
      id: 'asc',
    },
    where,
    include: {
      category: true,
      createdBy: {
        select: {
          id: true,
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              gender: true,
            },
          },
        },
      },
    },
  });
}
