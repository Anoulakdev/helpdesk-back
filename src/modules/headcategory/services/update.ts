import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateHeadcategoryDto } from '../dto/update-headcategory.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateHeadCategory(
  prisma: PrismaService,
  id: number,
  updateHeadcategoryDto: UpdateHeadcategoryDto,
) {
  const headcategory = await prisma.headCategory.findUnique({ where: { id } });
  if (!headcategory) throw new NotFoundException('headcategory not found');

  return prisma.headCategory.update({
    where: { id },
    data: {
      ...updateHeadcategoryDto,
      departmentId: Number(updateHeadcategoryDto.departmentId),
      divisionId: Number(updateHeadcategoryDto.divisionId),
    },
  });
}
