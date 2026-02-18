import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeHDRequest(prisma: PrismaService, id: number) {
  // ดึง helpdeskRequest พร้อม hdImgs
  const hdrequest = await prisma.helpdeskRequest.findUnique({
    where: { id },
    include: { hdImgs: true },
  });

  if (!hdrequest) throw new NotFoundException('helpdeskrequest not found');

  // ลบไฟล์ hdFile
  if (hdrequest.hdFile) {
    const filePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'hdfile',
      hdrequest.hdFile,
    );
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error(`Error deleting hdFile ${hdrequest.hdFile}:`, err);
    }
  }

  // ลบไฟล์ hdImgs
  if (hdrequest.hdImgs?.length) {
    await Promise.all(
      hdrequest.hdImgs.map(async (img) => {
        const filePath = path.resolve(
          process.env.UPLOAD_BASE_PATH || '',
          'hdimage',
          img.hdImg,
        );
        try {
          await fs.promises.access(filePath, fs.constants.F_OK);
          await fs.promises.unlink(filePath);
        } catch (fsError) {
          console.error(`Error deleting hdImg ${img.hdImg}:`, fsError);
        }
      }),
    );
  }

  // ลบ record ใน database แบบ transaction
  await prisma.$transaction(async (tx) => {
    // ลบ HelpdeskImg
    await tx.helpdeskImg.deleteMany({ where: { helpdeskRequestId: id } });

    // ลบ Assignment
    await tx.assignment.deleteMany({ where: { helpdeskRequestId: id } });

    // ลบ Chat
    await tx.chat.deleteMany({ where: { helpdeskRequestId: id } });

    // ลบ HelpdeskRequest
    await tx.helpdeskRequest.delete({ where: { id } });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'helpdeskrequest all data successfully deleted',
  };
}
