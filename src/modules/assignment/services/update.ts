import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAssignmentDto } from '../dto/update-assignment.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function updateAssignment(
  prisma: PrismaService,
  id: number,
  updateAssignmentDto: UpdateAssignmentDto,
) {
  // หา assignment
  const assignment = await prisma.assignment.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new NotFoundException('assignment not found');
  }

  const oldFile = assignment.commentImg || '';

  // ตรวจว่ามีรูปใหม่หรือไม่
  if (
    updateAssignmentDto.commentImg &&
    updateAssignmentDto.commentImg !== oldFile
  ) {
    // ถ้ามีไฟล์เก่าให้ลบ
    if (oldFile) {
      const oldFilePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'commentimg',
        oldFile,
      );

      try {
        await fs.access(oldFilePath);

        await fs.unlink(oldFilePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }
  } else {
    // ถ้าไม่ได้อัพรูปใหม่ ใช้รูปเดิม
    updateAssignmentDto.commentImg = oldFile;
  }

  // update database
  return prisma.assignment.update({
    where: { id },

    data: {
      commentImg: updateAssignmentDto.commentImg,

      helpdeskStatusId: updateAssignmentDto.helpdeskStatusId
        ? Number(updateAssignmentDto.helpdeskStatusId)
        : assignment.helpdeskStatusId,

      comment: updateAssignmentDto.comment,

      lat: updateAssignmentDto.lat
        ? Number(updateAssignmentDto.lat)
        : assignment.lat,

      lng: updateAssignmentDto.lng
        ? Number(updateAssignmentDto.lng)
        : assignment.lng,
    },
  });
}
