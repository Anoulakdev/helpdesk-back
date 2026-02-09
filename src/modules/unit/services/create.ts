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

interface Unit {
  id: number;
  unit_name: string;
  unit_code: string;
  unit_status: string;
  unit_type: string;
  divisionId: number;
  officeId: number;
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

async function fetchUnits(): Promise<Unit[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Unit[]> = await axios.get(
      `${process.env.URL_API}/units`,
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

export async function createUnit(
  prisma: PrismaService,
  // createUnitDto: CreateUnitDto,
) {
  const unitsData = await fetchUnits();

  if (Array.isArray(unitsData) && unitsData.length === 0) {
    throw new Error('No units data retrieved from external API');
  }

  const existing = await prisma.unit.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    unitsData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

      return prisma.unit.upsert({
        where: { id: d.id },
        update: {
          unit_name: d.unit_name,
          unit_code: d.unit_code,
          unit_status: d.unit_status,
          unit_type: d.unit_type,
          divisionId: d.divisionId,
          officeId: d.officeId,
        },
        create: {
          id: d.id,
          unit_name: d.unit_name,
          unit_code: d.unit_code,
          unit_status: d.unit_status,
          unit_type: d.unit_type,
          divisionId: d.divisionId,
          officeId: d.officeId,
        },
      });
    }),
  );

  return {
    success: true,
    total: unitsData.length,
    updated,
    created,
    message: 'Units synced successfully',
  };
}
