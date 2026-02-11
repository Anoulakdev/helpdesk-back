import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateHelpdeskstatusDto } from '../dto/update-helpdeskstatus.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateHelpdeskStatus(
  prisma: PrismaService,
  id: number,
  updateHelpdeskstatusDto: UpdateHelpdeskstatusDto,
) {
  const helpdeskStatus = await prisma.helpdeskStatus.findUnique({
    where: { id },
  });
  if (!helpdeskStatus) throw new NotFoundException('helpdesk status not found');

  return prisma.helpdeskStatus.update({
    where: { id },
    data: updateHelpdeskstatusDto,
  });
}
