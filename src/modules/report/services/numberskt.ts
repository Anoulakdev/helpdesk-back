import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function numberskt(prisma: PrismaService, numberSKT: string) {
  const hdrequests = await prisma.helpdeskRequest.findMany({
    where: {
      numberSKT,
    },
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
          assignedTo: {
            select: {
              id: true,
              employee: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  gender: true,
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
