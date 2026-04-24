import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateEliminateDto } from '../dto/update-eliminate.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function updateEliminate(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateEliminateDto: UpdateEliminateDto,
) {
  const eliminate = await prisma.eliminate.findUnique({
    where: { id },
  });
  if (!eliminate) throw new NotFoundException('eliminate not found');

  const oldFile = eliminate.eliminatefile || '';

  if (
    updateEliminateDto.eliminatefile &&
    updateEliminateDto.eliminatefile !== oldFile
  ) {
    const oldFilePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'eliminate',
      oldFile,
    );

    // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ก่อนจะลบ
    fs.access(oldFilePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Error deleting old icon:', err);
          }
        });
      }
    });
  } else {
    // ✅ ถ้าไม่มีรูปใหม่ ให้ใช้รูปเก่า
    updateEliminateDto.eliminatefile = oldFile;
  }

  return await prisma.eliminate.update({
    where: { id },
    data: {
      ...updateEliminateDto,
      createdById: user.id,
    },
  });
}
