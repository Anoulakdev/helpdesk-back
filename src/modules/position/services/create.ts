import { PrismaService } from '../../../prisma/prisma.service';
// import { CreateDepartmentDto } from '../dto/create-department.dto';
import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
}

interface LoginResult {
  success: boolean;
  token?: string;
  message: string;
}

interface Position {
  id: number;
  pos_name: string;
  pos_status: string;
  poscodeId: number;
}

// ฟังก์ชัน login API แยกออกมา
async function loginToApi(): Promise<LoginResult> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${process.env.URL_API}/login`,
      {
        username: process.env.USERNAME_API,
        password: process.env.PASSWORD_API,
      },
    );

    const token = response.data.token;
    if (!token) {
      return { success: false, message: 'Cannot get token' };
    }

    return { success: true, token, message: 'Login successful' };
  } catch (err: unknown) {
    let message = 'Login failed';
    if (err instanceof Error) {
      message = err.message;
    }

    console.error('Login API failed:', message);
    return { success: false, message };
  }
}

async function fetchPositions(): Promise<Position[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Position[]> = await axios.get(
      `${process.env.URL_API}/positions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch units';
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

  if (Array.isArray(positionsData) && positionsData.length === 0) {
    throw new Error('No positions data retrieved from external API');
  }

  const existing = await prisma.position.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    positionsData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

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
    }),
  );

  return {
    success: true,
    total: positionsData.length,
    updated,
    created,
    message: 'Position synced successfully',
  };
}
