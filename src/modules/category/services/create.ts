import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createCategory(
  prisma: PrismaService,
  user: AuthUser,
  createCategoryDto: CreateCategoryDto,
) {
  const headcategory = await prisma.headCategory.findFirst({
    where: { divisionId: user.employee.divisionId },
    select: { id: true },
  });
  if (!headcategory) throw new NotFoundException('headcategory not found');

  return prisma.category.create({
    data: {
      ...createCategoryDto,
      headCategoryId: headcategory.id,
      catIconId: Number(createCategoryDto.catIconId),
      createdById: user.id,
    },
  });
}
