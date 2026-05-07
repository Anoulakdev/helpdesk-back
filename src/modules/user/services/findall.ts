import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllUser(
  prisma: PrismaService,
  divisionId?: number,
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {
    ...(divisionId && {
      employee: {
        divisionId: Number(divisionId),
      },
    }),

    ...(search && {
      OR: [
        {
          username: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          employee: {
            first_name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
        {
          employee: {
            last_name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
        {
          employee: {
            tel: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
        {
          employee: {
            department: {
              department_name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
        {
          employee: {
            division: {
              division_name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
        {
          employee: {
            position: {
              pos_name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
      ],
    }),
  };

  const total = await prisma.user.count({
    where,
  });

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
      NextPage: page < Math.ceil(total / limit),
      PrevPage: page > 1,
    },
  };
}
