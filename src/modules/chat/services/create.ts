import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { CreateChatDto } from '../dto/create-chat.dto';

export async function createChat(
  prisma: PrismaService,
  user: AuthUser,
  createChatDto: CreateChatDto,
) {
  return prisma.chat.create({
    data: {
      helpdeskRequestId: Number(createChatDto.helpdeskRequestId),
      senderId: user.id,
      message: createChatDto.message,
    },
  });
}
