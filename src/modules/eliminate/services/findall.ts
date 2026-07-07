import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function FindAllEliminate(
  prisma: PrismaService,
  user: AuthUser,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const where = {
    helpdeskRequest: {
      ticket: {
        category: {
          headCategory: {
            divisionId: user.employee.divisionId,
          },
        },
      },
    },
  };

  const total = await prisma.eliminate.count({
    where,
  });

  const eliminates = await prisma.eliminate.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      id: 'desc',
    },
    include: {
      createdBy: {
        select: {
          id: true,
          employee: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              gender: true,
              emp_code: true,
            },
          },
        },
      },
      helpdeskRequest: {
        include: {
          ticket: {
            select: {
              id: true,
              title: true,
            },
          },
          helpdeskStatus: true,
          createdBy: {
            select: {
              id: true,
              employee: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  gender: true,
                  emp_code: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const data = eliminates.map((eliminate) => {
    return {
      ...eliminate,
      createdAt: moment(eliminate.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(eliminate.updatedAt).tz('Asia/Vientiane').format(),
    };
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
