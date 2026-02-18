import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateHelpdeskrequestDto } from '../dto/update-helpdeskrequest.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function updateHDRequest(
  prisma: PrismaService,
  id: number,
  dto: UpdateHelpdeskrequestDto,
) {
  const hdrequest = await prisma.helpdeskRequest.findUnique({
    where: { id },
    include: { hdImgs: true },
  });

  if (!hdrequest) throw new NotFoundException('hdrequest not found');

  const basePath = process.env.UPLOAD_BASE_PATH || '';
  let newHdFile = hdrequest.hdFile;

  /* =======================
     1️⃣ จัดการ hdFile
  ======================== */
  if (dto.hdFile && dto.hdFile !== hdrequest.hdFile) {
    if (hdrequest.hdFile) {
      const oldFilePath = path.resolve(basePath, 'hdfile', hdrequest.hdFile);
      try {
        await fs.promises.unlink(oldFilePath);
      } catch (err) {
        console.error('Error deleting old hdFile:', err);
      }
    }
    newHdFile = dto.hdFile;
  }

  const oldImages = hdrequest.hdImgs.map((i) => i.hdImg);

  return prisma.$transaction(async (tx) => {
    /* =======================
       2️⃣ จัดการ hdImgs
    ======================== */
    if (dto.hdImgs !== undefined) {
      const newImages = dto.hdImgs;

      const imagesToDelete = oldImages.filter(
        (old) => !newImages.includes(old),
      );

      for (const img of imagesToDelete) {
        const filePath = path.resolve(basePath, 'hdimage', img);
        try {
          await fs.promises.unlink(filePath);
        } catch (err) {
          console.error('Error deleting old hdImg:', err);
        }
      }

      await tx.helpdeskImg.deleteMany({
        where: { helpdeskRequestId: id },
      });

      if (newImages.length) {
        await tx.helpdeskImg.createMany({
          data: newImages.map((img) => ({
            helpdeskRequestId: id,
            hdImg: img,
          })),
        });
      }
    }

    /* =======================
       3️⃣ Update field ปกติ
    ======================== */

    const updated = await tx.helpdeskRequest.update({
      where: { id },
      data: {
        ticketId: Number(dto.ticketId),
        buildingId: Number(dto.buildingId),
        floorId: Number(dto.floorId),
        turningId: Number(dto.turningId),
        room: dto.room,
        numberSKT: dto.numberSKT,
        telephone: Number(dto.telephone),
        details: dto.details,
        priorityId: dto.priorityId ? Number(dto.priorityId) : null,
        hdFile: newHdFile ?? null,
      },
      include: { hdImgs: true },
    });

    return updated;
  });
}
