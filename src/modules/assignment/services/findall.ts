import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllAssignment(
  prisma: PrismaService,
  user: AuthUser,
  helpdeskStatusId?: number,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const where = {
    assignedToId: user.id,
    ...(helpdeskStatusId
      ? { helpdeskRequest: { helpdeskStatusId: Number(helpdeskStatusId) } }
      : undefined),
  };

  const total = await prisma.assignment.count({
    where,
  });

  const assigns = await prisma.assignment.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      id: 'desc',
    },
    include: {
      helpdeskStatus: true,
      helpdeskRequest: {
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
        },
      },
    },
  });

  const data = assigns.map((assign) => {
    return {
      ...assign,
      assignedAt: moment(assign.assignedAt).tz('Asia/Vientiane').format(),
      helpdeskRequest: {
        ...assign.helpdeskRequest,
        createdAt: moment(assign.helpdeskRequest.createdAt)
          .tz('Asia/Vientiane')
          .format(),
        updatedAt: moment(assign.helpdeskRequest.updatedAt)
          .tz('Asia/Vientiane')
          .format(),
      },
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
