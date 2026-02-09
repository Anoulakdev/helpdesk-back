import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFloorDto } from '../dto/create-floor.dto';

export async function createFloor(
  prisma: PrismaService,
  createFloorDto: CreateFloorDto,
) {
  return prisma.floor.create({
    data: createFloorDto,
  });
}
