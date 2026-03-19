import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function reportStaff(
  prisma: PrismaService,
  user: AuthUser,
  startDate: string,
  endDate: string,
) {
  const where = {
    assignedToId: user.id,
    helpdeskStatusId: 4,
    helpdeskRequest: {
      createdAt: {
        gte: new Date(`${startDate}T00:00:00+07:00`),
        lte: new Date(`${endDate}T23:59:59+07:00`),
      },
    },
  };

  const assigns = await prisma.assignment.findMany({
    where,
    orderBy: {
      id: 'asc',
    },
    include: {
      helpdeskRequest: {
        include: {
          ticket: {
            select: {
              id: true,
              title: true,
              category: {
                select: {
                  id: true,
                  title: true,
                },
              },
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
                  department: {
                    select: {
                      id: true,
                      department_name: true,
                    },
                  },
                  division: {
                    select: {
                      id: true,
                      division_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const formatted = assigns.map((assign) => ({
    ...assign,
    helpdeskRequest: {
      ...assign.helpdeskRequest,
      createdAt: moment(assign.helpdeskRequest.createdAt)
        .tz('Asia/Vientiane')
        .format(),
      updatedAt: moment(assign.helpdeskRequest.updatedAt)
        .tz('Asia/Vientiane')
        .format(),
    },
  }));

  return formatted;
}
