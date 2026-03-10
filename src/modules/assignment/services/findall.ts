import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllAssignment(
  prisma: PrismaService,
  user: AuthUser,
  helpdeskStatusId?: number,
) {
  const where = {
    assignedToId: user.id,
    ...(helpdeskStatusId
      ? { helpdeskRequest: { helpdeskStatusId: Number(helpdeskStatusId) } }
      : undefined),
  };

  const assigns = await prisma.assignment.findMany({
    where,
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

  return assigns.map((assign) => {
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
}
