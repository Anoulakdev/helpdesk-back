import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeHelpdeskStatus(prisma: PrismaService, id: number) {
  const helpdeskStatus = await prisma.helpdeskStatus.findUnique({
    where: { id },
  });
  if (!helpdeskStatus) throw new NotFoundException('helpdesk status not found');

  await prisma.helpdeskStatus.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'helpdesk status deleted successfully',
  };
}
