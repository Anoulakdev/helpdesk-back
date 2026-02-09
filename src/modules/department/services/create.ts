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

interface Department {
  id: number;
  department_name: string;
  department_code: string;
  department_status: string;
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

    console.error('Login API failed:', message); // ใช้ console แทน this.logger
    return { success: false, message };
  }
}

// ฟังก์ชันดึงข้อมูล department
async function fetchDepartments(): Promise<Department[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  // เรียก API ดึง departments
  try {
    const response: AxiosResponse<Department[]> = await axios.get(
      `${process.env.URL_API}/departments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch departments';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

// ฟังก์ชัน createDepartment
export async function createDepartment(
  prisma: PrismaService,
  // createDepartmentDto: CreateDepartmentDto,
) {
  const departmentsData = await fetchDepartments();

  if (Array.isArray(departmentsData) && departmentsData.length === 0) {
    throw new Error('No departments data retrieved from external API');
  }

  const existing = await prisma.department.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    departmentsData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

      return prisma.department.upsert({
        where: { id: d.id },
        update: {
          department_name: d.department_name,
          department_code: d.department_code,
          department_status: d.department_status,
        },
        create: {
          id: d.id,
          department_name: d.department_name,
          department_code: d.department_code,
          department_status: d.department_status,
        },
      });
    }),
  );

  return {
    success: true,
    total: departmentsData.length,
    updated,
    created,
    message: 'Departments synced successfully',
  };
}
