import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneHDRequest(prisma: PrismaService, id: number) {
  const hdrequest = await prisma.helpdeskRequest.findUnique({
    where: { id },
    include: {
      ticket: {
        select: {
          id: true,
          title: true,
          description: true,
        },
      },
      helpdeskStatus: true,
      building: true,
      floor: true,
      turning: true,
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
              office: {
                select: {
                  id: true,
                  office_name: true,
                },
              },
              position: true,
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
                  tel: true,
                },
              },
            },
          },
        },
      },
      chats: {
        orderBy: {
          id: 'desc',
        },
        include: {
          sender: {
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
      hdImgs: true,
    },
  });
  if (!hdrequest) throw new NotFoundException('helpdeskrequest not found');
  return {
    ...hdrequest,
    createdAt: moment(hdrequest.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(hdrequest.updatedAt).tz('Asia/Vientiane').format(),
    chats: hdrequest.chats.map((chat) => ({
      ...chat,
      createdAt: moment(chat.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(chat.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
