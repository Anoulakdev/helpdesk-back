import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHelpdeskrequestDto } from '../dto/create-helpdeskrequest.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as fs from 'fs';
import * as path from 'path';

export async function createHDRequest(
  prisma: PrismaService,
  user: AuthUser,
  createHelpdeskrequestDto: CreateHelpdeskrequestDto,
  hdFileName?: string,
  hdImgNames?: string[],
) {
  try {
    return await prisma.helpdeskRequest.create({
      data: {
        ...createHelpdeskrequestDto,
        ticketId: Number(createHelpdeskrequestDto.ticketId),
        buildingId: Number(createHelpdeskrequestDto.buildingId),
        floorId: Number(createHelpdeskrequestDto.floorId),
        turningId: Number(createHelpdeskrequestDto.turningId),
        telephone: Number(createHelpdeskrequestDto.telephone),
        createdById: user.id,
        hdFile: hdFileName ?? null,
        hdImgs: hdImgNames?.length
          ? {
              create: hdImgNames.map((img) => ({ hdImg: img })),
            }
          : undefined,
      },
      include: { hdImgs: true },
    });
  } catch (error) {
    console.error('Error creating helpdesk request:', error);

    // ลบไฟล์ hdFile
    if (hdFileName) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'hdfile',
        hdFileName,
      );
      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
        console.log(`Deleted hdFile: ${hdFileName}`);
      } catch (fsError) {
        console.error('Error deleting hdFile:', fsError);
      }
    }

    // ลบไฟล์ hdImgs
    if (hdImgNames?.length) {
      await Promise.all(
        hdImgNames.map(async (img) => {
          const filePath = path.resolve(
            process.env.UPLOAD_BASE_PATH || '',
            'hdimage',
            img,
          );
          try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            await fs.promises.unlink(filePath);
            console.log(`Deleted hdImg: ${img}`);
          } catch (fsError) {
            console.error(`Error deleting hdImg ${img}:`, fsError);
          }
        }),
      );
    }

    throw error;
  }
}
