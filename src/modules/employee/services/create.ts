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

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  emp_code: string;
  status: string;
  gender: string;
  tel: string;
  email: string;
  empimg: string;
  posId: number;
  departmentId: number;
  divisionId: number;
  officeId: number;
  unitId: number;
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

async function fetchEmployees(): Promise<Employee[]> {
  // login ก่อน
  const loginResult = await loginToApi();
  if (!loginResult.success || !loginResult.token) {
    throw new Error(`Login failed: ${loginResult.message}`);
  }

  const token = loginResult.token;

  try {
    const response: AxiosResponse<Employee[]> = await axios.get(
      `${process.env.URL_API}/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    let message = 'Failed to fetch employees';
    if (err instanceof Error) message = err.message;
    console.error(message);
    throw new Error(message);
  }
}

export async function createEmployee(
  prisma: PrismaService,
  // createUnitDto: CreateUnitDto,
) {
  const employeesData = await fetchEmployees();

  if (Array.isArray(employeesData) && employeesData.length === 0) {
    throw new Error('No employees data retrieved from external API');
  }

  const existing = await prisma.employee.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existing.map((d) => d.id));

  let updated = 0;
  let created = 0;

  await Promise.all(
    employeesData.map(async (d) => {
      const isNew = !existingIds.has(d.id);
      if (isNew) {
        created++;
      } else {
        updated++;
      }

      return prisma.employee.upsert({
        where: { id: d.id },
        update: {
          first_name: d.first_name,
          last_name: d.last_name,
          emp_code: d.emp_code,
          status: d.status,
          gender: d.gender,
          tel: d.tel,
          email: d.email,
          empimg: d.empimg,
          posId: d.posId,
          departmentId: d.departmentId,
          divisionId: d.divisionId,
          officeId: d.officeId,
          unitId: d.unitId,
        },
        create: {
          id: d.id,
          first_name: d.first_name,
          last_name: d.last_name,
          emp_code: d.emp_code,
          status: d.status,
          gender: d.gender,
          tel: d.tel,
          email: d.email,
          empimg: d.empimg,
          posId: d.posId,
          departmentId: d.departmentId,
          divisionId: d.divisionId,
          officeId: d.officeId,
          unitId: d.unitId,
        },
      });
    }),
  );

  return {
    success: true,
    total: employeesData.length,
    updated,
    created,
    message: 'Employee synced successfully',
  };
}
