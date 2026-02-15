import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeCategoryIcon(prisma: PrismaService, id: number) {
  const categoryicon = await prisma.categoryIcon.findUnique({
    where: { id },
  });
  if (!categoryicon) throw new NotFoundException('Categoryicon not found');

  if (categoryicon.catIcon) {
    const filePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'categoryicon',
      categoryicon.catIcon,
    );

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    });
  }

  await prisma.categoryIcon.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'categoryicon deleted successfully',
  };
}
