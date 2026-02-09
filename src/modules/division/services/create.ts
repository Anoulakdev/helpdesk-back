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

interface Division {
  id: number;
  division_name: string;
  division_code: string;
  division_status: string;
  branch_id: number;
  departmentId: number;
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

async function fetchDivisions(): Promise<Division[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Division[]> = await axios.get(
      `${process.env.URL_API}/divisions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch divisions';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

export async function createDivision(
  prisma: PrismaService,
  // createDivisionDto: CreateDivisionDto,
) {
  const divisionsData = await fetchDivisions();

  if (Array.isArray(divisionsData) && divisionsData.length === 0) {
    throw new Error('No divisions data retrieved from external API');
  }

  const existing = await prisma.division.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    divisionsData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

      return prisma.division.upsert({
        where: { id: d.id },
        update: {
          division_name: d.division_name,
          division_code: d.division_code,
          division_status: d.division_status,
          branch_id: d.branch_id,
          departmentId: d.departmentId,
        },
        create: {
          id: d.id,
          division_name: d.division_name,
          division_code: d.division_code,
          division_status: d.division_status,
          branch_id: d.branch_id,
          departmentId: d.departmentId,
        },
      });
    }),
  );

  return {
    success: true,
    total: divisionsData.length,
    updated,
    created,
    message: 'Divisions synced successfully',
  };
}
