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

interface Positiongroup {
  id: number;
  pos_group_name: string;
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

async function fetchPositionGroups(): Promise<Positiongroup[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Positiongroup[]> = await axios.get(
      `${process.env.URL_API}/positiongroups`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch position groups';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

export async function createPositionGroup(prisma: PrismaService) {
  const positionGroupsData = await fetchPositionGroups();

  if (!positionGroupsData.length) {
    throw new Error('No position groups data retrieved from external API');
  }

  let updated = 0;
  let created = 0;

  const existing = await prisma.positionGroup.findMany({
    select: { id: true },
  });
  const existingIds = new Set(existing.map((e) => e.id));

  const operations = positionGroupsData.map((d) => {
    if (existingIds.has(d.id)) updated++;
    else created++;

    return prisma.positionGroup.upsert({
      where: { id: d.id },
      update: { pos_group_name: d.pos_group_name },
      create: {
        id: d.id,
        pos_group_name: d.pos_group_name,
      },
    });
  });

  await prisma.$transaction(operations);

  return {
    success: true,
    total: positionGroupsData.length,
    updated,
    created,
    message: 'Position groups synced successfully',
  };
}
