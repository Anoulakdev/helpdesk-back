import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTurningDto } from '../dto/create-turning.dto';

export async function createTurning(
  prisma: PrismaService,
  createTurningDto: CreateTurningDto,
) {
  return prisma.turning.create({
    data: createTurningDto,
  });
}
