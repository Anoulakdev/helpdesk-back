import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeTicket(prisma: PrismaService, id: number) {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  if (!ticket) throw new NotFoundException('ticket not found');

  await prisma.ticket.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'ticket deleted successfully',
  };
}
