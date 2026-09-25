import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';
import * as moment from 'moment-timezone';

export async function countHelpDesk(prisma: PrismaService, user: AuthUser) {
  const where: Prisma.HelpdeskRequestWhereInput = {
    ...(user.roleId === 2 && {
      ticket: {
        category: {
          headCategory: {
            divisionId: user.employee?.divisionId,
          },
        },
      },
    }),
  };

  const todayStart = moment().tz('Asia/Vientiane').startOf('day').toDate();
  const todayEnd = moment().tz('Asia/Vientiane').endOf('day').toDate();

  const [total, today, inProgress] = await Promise.all([
    // 1. หาจำนวนทั้งหมด
    prisma.helpdeskRequest.count({
      where,
    }),
    // 2. หาจำนวนวันนี้
    prisma.helpdeskRequest.count({
      where: {
        ...where,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    }),
    // 3. หาจำนวนที่มี helpdeskStatusId = 3
    prisma.helpdeskRequest.count({
      where: {
        ...where,
        helpdeskStatusId: 3,
      },
    }),
  ]);

  return {
    total,
    today,
    inProgress,
  };
}
