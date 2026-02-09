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

interface Office {
  id: number;
  office_name: string;
  office_code: string;
  office_status: string;
  divisionId: number;
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

async function fetchOffices(): Promise<Office[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Office[]> = await axios.get(
      `${process.env.URL_API}/offices`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch offices';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

export async function createOffice(
  prisma: PrismaService,
  // createOfficeDto: CreateOfficeDto,
) {
  const officesData = await fetchOffices();

  if (Array.isArray(officesData) && officesData.length === 0) {
    throw new Error('No offices data retrieved from external API');
  }

  const existing = await prisma.office.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    officesData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

      return prisma.office.upsert({
        where: { id: d.id },
        update: {
          office_name: d.office_name,
          office_code: d.office_code,
          office_status: d.office_status,
          divisionId: d.divisionId,
        },
        create: {
          id: d.id,
          office_name: d.office_name,
          office_code: d.office_code,
          office_status: d.office_status,
          divisionId: d.divisionId,
        },
      });
    }),
  );

  return {
    success: true,
    total: officesData.length,
    updated,
    created,
    message: 'Offices synced successfully',
  };
}
