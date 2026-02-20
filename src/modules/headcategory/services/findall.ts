import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function findAllHeadCategory(prisma: PrismaService) {
  const headcategories = await prisma.headCategory.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      department: true,
      division: true,
    },
  });

  return headcategories.map((headcategory) => ({
    ...headcategory,
    createdAt: moment(headcategory.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(headcategory.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
