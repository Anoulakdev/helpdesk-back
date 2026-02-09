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

interface Positioncode {
  id: number;
  pos_code_name: string;
  pos_code_status: string;
  posgroupId: number;
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

async function fetchPositionCodes(): Promise<Positioncode[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Positioncode[]> = await axios.get(
      `${process.env.URL_API}/positioncodes`,
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

export async function createPositionCode(
  prisma: PrismaService,
  // createUnitDto: CreateUnitDto,
) {
  const positionCodesData = await fetchPositionCodes();

  if (!positionCodesData.length) {
    throw new Error('No position codes data retrieved from external API');
  }

  let updated = 0;
  let created = 0;

  const existing = await prisma.positionCode.findMany({
    select: { id: true },
  });
  const existingIds = new Set(existing.map((e) => e.id));

  const operations = positionCodesData.map((d) => {
    if (existingIds.has(d.id)) updated++;
    else created++;

    return prisma.positionCode.upsert({
      where: { id: d.id },
      update: {
        pos_code_name: d.pos_code_name,
        pos_code_status: d.pos_code_status,
        posgroupId: d.posgroupId,
      },
      create: {
        id: d.id,
        pos_code_name: d.pos_code_name,
        pos_code_status: d.pos_code_status,
        posgroupId: d.posgroupId,
      },
    });
  });

  await prisma.$transaction(operations);

  return {
    success: true,
    total: positionCodesData.length,
    updated,
    created,
    message: 'Position codes synced successfully',
  };
}
