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

  return prisma.$transaction(async (tx) => {
    // 1. ดึง assignment ที่ต้องการ
    const assignments = await tx.assignment.findMany({
      where: { id: { in: id } },
      select: {
        helpdeskRequestId: true,
        helpdeskStatusId: true,
      },
    });

    // 2. update assignment -> accepted
    const result = await tx.assignment.updateMany({
      where: { id: { in: id } },
      data: { helpdeskStatusId: 3 },
    });

    // 3. หา request ที่ status = 2
    const requestIds = [
      ...new Set(
        assignments
          .filter((a) => a.helpdeskStatusId === 2)
          .map((a) => a.helpdeskRequestId),
      ),
    ];

    // 4. update helpdeskRequest
    if (requestIds.length > 0) {
      await tx.helpdeskRequest.updateMany({
        where: {
          id: { in: requestIds },
          helpdeskStatusId: 2,
        },
        data: { helpdeskStatusId: 3 },
      });
    }

    return result;
  });
}
