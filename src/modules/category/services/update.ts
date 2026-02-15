import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateCategory(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateCategoryDto: UpdateCategoryDto,
) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new NotFoundException('category not found');

  return prisma.category.update({
    where: { id },
    data: {
      ...updateCategoryDto,
      catIconId: Number(updateCategoryDto.catIconId),
      createdById: user.id,
    },
  });
}
