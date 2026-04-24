import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function reportEliminate(
  prisma: PrismaService,
  user: AuthUser,
  startDate: string,
  endDate: string,
) {
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
    createdAt: {
      gte: new Date(`${startDate}T00:00:00+07:00`),
      lte: new Date(`${endDate}T23:59:59+07:00`),
    },
  };

  const eliminates = await prisma.eliminate.findMany({
    where,
    orderBy: {
      id: 'asc',
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

  return eliminates.map((eliminate) => {
    return {
      ...eliminate,
      createdAt: moment(eliminate.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(eliminate.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
