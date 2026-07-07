import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function adminFindAll(
  prisma: PrismaService,
  user: AuthUser,
  helpdeskStatusId?: number,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const where = {
    ticket: {
      category: {
        headCategory: {
          divisionId: user.employee.divisionId,
        },
      },
    },
    ...(helpdeskStatusId
      ? { helpdeskStatusId: Number(helpdeskStatusId) }
      : { helpdeskStatusId: { in: [1, 2, 3, 4, 5, 6] } }),
  };

  const total = await prisma.helpdeskRequest.count({
    where,
  });

  const hdrequests = await prisma.helpdeskRequest.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      id: 'desc',
    },
    include: {
      ticket: {
        select: {
          id: true,
          title: true,
        },
      },
      helpdeskStatus: true,
      priority: true,
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
      assignments: {
        include: {
          helpdeskStatus: true,
          assignedTo: {
            select: {
              id: true,
              employee: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  gender: true,
                  emp_code: true,
                  empimg: true,
                  tel: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const data = hdrequests.map((hdrequest) => {
    return {
      ...hdrequest,
      createdAt: moment(hdrequest.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(hdrequest.updatedAt).tz('Asia/Vientiane').format(),
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
