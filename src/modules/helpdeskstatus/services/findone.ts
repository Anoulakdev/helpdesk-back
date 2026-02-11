import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneHelpdeskStatus(prisma: PrismaService, id: number) {
  const helpdeskStatus = await prisma.helpdeskStatus.findUnique({
    where: { id },
  });
  if (!helpdeskStatus) throw new NotFoundException('helpdesk status not found');
  return helpdeskStatus;
}
