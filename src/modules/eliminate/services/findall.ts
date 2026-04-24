import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function FindAllEliminate(prisma: PrismaService, user: AuthUser) {
  const eliminates = await prisma.eliminate.findMany({
    where: {
      helpdeskRequest: {
        ticket: {
          category: {
            headCategory: {
              divisionId: user.employee.divisionId,
            },
          },
        },
      },
    },
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

  return eliminates.map((eliminate) => {
    return {
      ...eliminate,
      createdAt: moment(eliminate.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(eliminate.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
