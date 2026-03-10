import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAssignmentDto } from '../dto/update-assignment.dto';

export async function acceptAssignment(
  prisma: PrismaService,
  updateAssignmentDto: UpdateAssignmentDto,
) {
  const { id } = updateAssignmentDto;

  if (!id?.length) {
    throw new Error('id are required');
  }

  const ids = await prisma.assignment.findMany({
    where: { id: { in: id } },
    select: { helpdeskRequestId: true, helpdeskStatusId: true },
  });

  const result = await prisma.assignment.updateMany({
    where: { id: { in: id } },
    data: { helpdeskStatusId: 3 },
  });

  if (result.count > 0 && ids.some((item) => item.helpdeskStatusId === 2)) {
    await prisma.helpdeskRequest.updateMany({
      where: { id: { in: ids.map((item) => item.helpdeskRequestId) } },
      data: { helpdeskStatusId: 3 },
    });
  }

  return result;
}
