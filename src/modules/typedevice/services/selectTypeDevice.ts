import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function selectTypeDevice(
  prisma: PrismaService,
  user: AuthUser,
  ticketId: number,
) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(ticketId) },
    select: {
      category: {
        select: {
          headCategoryId: true,
        },
      },
    },
  });

  if (!ticket || !ticket.category) {
    throw new NotFoundException('Ticket or Category not found');
  }

  const headCategoryId = ticket.category.headCategoryId;

  return prisma.typeDevice.findMany({
    where: {
      headCategoryId: headCategoryId,
    },
    orderBy: {
      id: 'asc',
    },
  });
}
