import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function adminFindAll(
  prisma: PrismaService,
  user: AuthUser,
  helpdeskStatusId?: number,
) {
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
      : undefined),
  };

  const hdrequests = await prisma.helpdeskRequest.findMany({
    where,
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
        select: {
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
                  tel: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return hdrequests.map((hdrequest) => {
    return {
      ...hdrequest,
      createdAt: moment(hdrequest.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(hdrequest.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
