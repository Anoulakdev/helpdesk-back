import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateHelpdeskrequestDto } from '../dto/update-helpdeskrequest.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateHelpdeskStatus(
  prisma: PrismaService,
  id: number,
  updateHelpdeskrequestDto: UpdateHelpdeskrequestDto,
) {
  const hdrequest = await prisma.helpdeskRequest.findUnique({ where: { id } });
  if (!hdrequest) throw new NotFoundException('helpdeskrequest not found');

  const updatedHDRequest = await prisma.helpdeskRequest.update({
    where: { id },
    data: {
      helpdeskStatusId: Number(updateHelpdeskrequestDto.helpdeskStatusId),
    },
  });

  return {
    message: 'Helpdesk Status updated successfully',
    data: updatedHDRequest,
  };
}
