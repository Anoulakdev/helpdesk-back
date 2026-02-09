import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBuildingDto } from '../dto/create-building.dto';

export async function createBuilding(
  prisma: PrismaService,
  createBuildingDto: CreateBuildingDto,
) {
  return prisma.building.create({
    data: createBuildingDto,
  });
}
