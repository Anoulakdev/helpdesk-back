import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateTicket(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateTicketDto: UpdateTicketDto,
) {
  const category = await prisma.ticket.findUnique({ where: { id } });
  if (!category) throw new NotFoundException('category not found');

  return prisma.ticket.update({
    where: { id },
    data: {
      ...updateTicketDto,
      categoryId: Number(updateTicketDto.categoryId),
      createdById: user.id,
    },
  });
}
