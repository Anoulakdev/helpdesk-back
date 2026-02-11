import { PrismaService } from '../../../prisma/prisma.service';
import { externalApi } from '../../../utils/external-api';

interface Position {
  id: number;
  pos_name: string;
  pos_status: string;
  poscodeId: number;
}

async function fetchPositions(): Promise<Position[]> {
  try {
    const response = await externalApi.get<Position[]>('/positions');

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch positions';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

export async function createPosition(
  prisma: PrismaService,
  // createUnitDto: CreateUnitDto,
) {
  const positionsData = await fetchPositions();

  if (!positionsData.length) {
    throw new Error('No positions data retrieved from external API');
  }

  let updated = 0;
  let created = 0;

  const existing = await prisma.position.findMany({
    select: { id: true },
  });
  const existingIds = new Set(existing.map((e) => e.id));

  const operations = positionsData.map((d) => {
    if (existingIds.has(d.id)) updated++;
    else created++;

    return prisma.position.upsert({
      where: { id: d.id },
      update: {
        pos_name: d.pos_name,
        pos_status: d.pos_status,
        poscodeId: d.poscodeId,
      },
      create: {
        id: d.id,
        pos_name: d.pos_name,
        pos_status: d.pos_status,
        poscodeId: d.poscodeId,
      },
    });
  });

  await prisma.$transaction(operations);

  return {
    success: true,
    total: positionsData.length,
    updated,
    created,
    message: 'Position synced successfully',
  };
}
