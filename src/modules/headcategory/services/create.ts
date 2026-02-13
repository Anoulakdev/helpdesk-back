import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHeadcategoryDto } from '../dto/create-headcategory.dto';

export async function createHeadCategory(
  prisma: PrismaService,
  createHeadCategoryDto: CreateHeadcategoryDto,
) {
  return prisma.headCategory.create({
    data: {
      ...createHeadCategoryDto,
      departmentId: Number(createHeadCategoryDto.departmentId),
      divisionId: Number(createHeadCategoryDto.divisionId),
    },
  });
}
