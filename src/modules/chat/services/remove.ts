import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeChat(prisma: PrismaService, id: number) {
  const chat = await prisma.chat.findUnique({ where: { id } });
  if (!chat) throw new NotFoundException('chat not found');

  await prisma.chat.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'chat deleted successfully',
  };
}
