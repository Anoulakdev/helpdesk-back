import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllUser(
  prisma: PrismaService,
  divisionId?: number,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const where = divisionId
    ? {
        employee: {
          divisionId: Number(divisionId),
        },
      }
    : undefined;

  // total count
  const total = await prisma.user.count({
    where,
  });

  // data
  const data = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      username: true,
      employeeId: true,
      roleId: true,
      role: true,
      employee: {
        include: {
          department: true,
          division: true,
          office: true,
          unit: true,
          position: true,
        },
      },
    },
  });

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
}
