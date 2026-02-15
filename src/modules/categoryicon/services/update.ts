import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateCategoryiconDto } from '../dto/update-categoryicon.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function updateCategoryIcon(
  prisma: PrismaService,
  id: number,
  updateCategoryiconDto: UpdateCategoryiconDto,
) {
  const categoryicon = await prisma.categoryIcon.findUnique({
    where: { id },
  });
  if (!categoryicon) throw new NotFoundException('categoryicon not found');

  const oldFile = categoryicon.catIcon || '';

  if (
    updateCategoryiconDto.catIcon &&
    updateCategoryiconDto.catIcon !== oldFile
  ) {
    const oldFilePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'categoryicon',
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
    updateCategoryiconDto.catIcon = oldFile;
  }

  return await prisma.categoryIcon.update({
    where: { id },
    data: {
      ...updateCategoryiconDto,
    },
  });
}
