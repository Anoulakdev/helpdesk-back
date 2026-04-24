import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { CreateEliminateDto } from '../dto/create-eliminate.dto';
import * as fs from 'fs';
import * as path from 'path';

export async function createEliminate(
  prisma: PrismaService,
  user: AuthUser,
  createEliminateDto: CreateEliminateDto,
  Eliminatefilename: string,
) {
  try {
    return await prisma.$transaction(async (tx) => {
      const eliminate = await tx.eliminate.create({
        data: {
          ...createEliminateDto,
          helpdeskRequestId: Number(createEliminateDto.helpdeskRequestId),
          createdById: user.id,
        },
      });

      await tx.helpdeskRequest.update({
        where: {
          id: Number(createEliminateDto.helpdeskRequestId),
        },
        data: {
          helpdeskStatusId: 9,
        },
      });

      return eliminate;
    });
  } catch (error) {
    if (Eliminatefilename) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'eliminate',
        Eliminatefilename,
      );

      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
      } catch (fsError) {
        console.error('Error deleting uploaded icon:', fsError);
      }
    }
    throw error;
  }
}
