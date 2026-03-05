import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function reportTicket(
  prisma: PrismaService,
  user: AuthUser,
  startDate: string,
  endDate: string,
) {
  const where = {
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
  };

  const hdrequests = await prisma.helpdeskRequest.findMany({
    where,
    orderBy: {
      id: 'asc',
    },
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
  });

  const formatted = hdrequests.map((hdrequest) => ({
    ...hdrequest,
    createdAt: moment(hdrequest.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(hdrequest.updatedAt).tz('Asia/Vientiane').format(),
  }));

  // group by ticket.id
  const grouped = formatted.reduce(
    (acc, curr) => {
      const ticketId = curr.ticket.id;

      if (!acc[ticketId]) {
        acc[ticketId] = {
          ticketId: curr.ticket.id,
          ticketTitle: curr.ticket.title,
          total: 0,
          requests: [],
        };
      }

      acc[ticketId].total += 1;
      acc[ticketId].requests.push(curr);

      return acc;
    },
    {} as Record<string, any>,
  );

  return Object.values(grouped);
}
