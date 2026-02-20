import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateChat(
  prisma: PrismaService,
  id: number,
  updateChatDto: UpdateChatDto,
) {
  const chat = await prisma.chat.findUnique({ where: { id } });
  if (!chat) throw new NotFoundException('chat not found');

  return prisma.chat.update({
    where: { id },
    data: {
      message: updateChatDto.message,
    },
  });
}
