import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createTicket(
  prisma: PrismaService,
  user: AuthUser,
  createTicketDto: CreateTicketDto,
) {
  return prisma.ticket.create({
    data: {
      ...createTicketDto,
      categoryId: Number(createTicketDto.categoryId),
      createdById: user.id,
    },
  });
}
