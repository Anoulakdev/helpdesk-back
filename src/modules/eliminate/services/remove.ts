import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeEliminate(prisma: PrismaService, id: number) {
  const eliminate = await prisma.eliminate.findUnique({
    where: { id },
  });
  if (!eliminate) throw new NotFoundException('Eliminate not found');

  if (eliminate.eliminatefile) {
    const filePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'eliminate',
      eliminate.eliminatefile,
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

  await prisma.$transaction([
    // 1. update helpdesk status
    prisma.helpdeskRequest.update({
      where: { id: eliminate.helpdeskRequestId },
      data: {
        helpdeskStatusId: 6,
      },
    }),

    // 2. delete eliminate
    prisma.eliminate.delete({
      where: { id },
    }),
  ]);

  return {
    statusCode: HttpStatus.OK,
    message: 'eliminate deleted successfully',
  };
}
