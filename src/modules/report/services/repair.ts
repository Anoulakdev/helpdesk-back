/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function reportRepair(
  prisma: PrismaService,
  user: AuthUser,
  startDate: string,
  endDate: string,
) {
  const where = {
    helpdeskStatusId: 4,
    helpdeskRequest: {
      ticket: {
        category: {
          headCategory: {
            divisionId: user.employee.divisionId,
          },
        },
      },
      createdAt: {
        gte: new Date(`${startDate}T00:00:00+07:00`),
        lte: new Date(`${endDate}T23:59:59+07:00`),
      },
    },
  };

  const hdrequests = await prisma.assignment.findMany({
    where,
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      helpdeskStatusId: true,
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

  const formatted = hdrequests.map((hdrequest) => ({
    ...hdrequest,
    helpdeskRequest: {
      ...hdrequest.helpdeskRequest,
      createdAt: moment(hdrequest.helpdeskRequest.createdAt)
        .tz('Asia/Vientiane')
        .format(),
      updatedAt: moment(hdrequest.helpdeskRequest.updatedAt)
        .tz('Asia/Vientiane')
        .format(),
    },
  }));

  const grouped = formatted.reduce(
    (acc, curr) => {
      const staffId = curr.assignedTo.id;

      if (!acc[staffId]) {
        acc[staffId] = {
          staffId: curr.assignedTo.id,
          staffName:
            curr.assignedTo.employee.emp_code +
            ' - ' +
            curr.assignedTo.employee.first_name +
            ' ' +
            curr.assignedTo.employee.last_name,
          total: 0,
          requests: [],
        };
      }

      acc[staffId].total += 1;

      const { assignedTo, ...rest } = curr; // 👈 ตัดออกตรงนี้
      acc[staffId].requests.push(rest);

      return acc;
    },
    {} as Record<string, any>,
  );

  return Object.values(grouped);
}
