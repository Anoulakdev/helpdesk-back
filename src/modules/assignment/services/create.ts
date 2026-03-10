import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';

export async function createAssignment(
  prisma: PrismaService,
  createAssignmentDto: CreateAssignmentDto,
) {
  const { helpdeskRequestId, assignedToId } = createAssignmentDto;

  if (!helpdeskRequestId?.length || !assignedToId?.length) {
    throw new Error('helpdeskRequestId and assignedToId are required');
  }

  // ทำ Cartesian Product
  const data = helpdeskRequestId.flatMap((requestId) =>
    assignedToId.map((userId) => ({
      helpdeskRequestId: requestId,
      assignedToId: userId,
      helpdeskStatusId: 2,
    })),
  );

  const result = await prisma.$transaction(async (tx) => {
    // Insert Assignment
    const insertResult = await tx.assignment.createMany({
      data,
      skipDuplicates: true,
    });

    // Update Status เฉพาะที่มี assignment ใหม่จริง
    if (insertResult.count > 0) {
      await tx.helpdeskRequest.updateMany({
        where: { id: { in: helpdeskRequestId } },
        data: { helpdeskStatusId: 2 },
      });
    }

    return insertResult;
  });

  return {
    success: true,
    attempted: data.length, // พยายาม insert กี่รายการ
    inserted: result.count, // insert สำเร็จกี่รายการ
    duplicated: data.length - result.count, // ซ้ำกี่รายการ
  };
}
