import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHelpdeskstatusDto } from '../dto/create-helpdeskstatus.dto';

export async function createHelpdeskStatus(
  prisma: PrismaService,
  createHelpdeskStatusDto: CreateHelpdeskstatusDto,
) {
  return prisma.helpdeskStatus.create({
    data: createHelpdeskStatusDto,
  });
}
