import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoryiconDto } from '../dto/create-categoryicon.dto';
import * as fs from 'fs';
import * as path from 'path';

export async function createCategoryIcon(
  prisma: PrismaService,
  createCategoryiconDto: CreateCategoryiconDto,
  CatIconfilename: string,
) {
  try {
    return await prisma.categoryIcon.create({
      data: {
        ...createCategoryiconDto,
      },
    });
  } catch (error) {
    if (CatIconfilename) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'categoryicon',
        CatIconfilename,
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
