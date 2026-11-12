import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBuildingDto } from '../dto/create-building.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createBuilding(
  prisma: PrismaService,
  user: AuthUser,
  createBuildingDto: CreateBuildingDto,
) {
  if (user.roleId === 1) {
    return prisma.building.create({
      data: {
        name: createBuildingDto.name,
      },
    });
  }

  if (user.roleId === 2 && user.employee?.division?.branch_id === 2) {
    return prisma.building.create({
      data: {
        name: createBuildingDto.name,
        divisionId: user.employee.divisionId,
      },
    });
  }

  throw new ForbiddenException('Permission denied');
}
