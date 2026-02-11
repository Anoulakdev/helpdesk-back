import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';

export async function createPriority(
  prisma: PrismaService,
  createPriorityDto: CreatePriorityDto,
) {
  return prisma.priority.create({
    data: createPriorityDto,
  });
}
