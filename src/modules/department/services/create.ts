import { PrismaService } from '../../../prisma/prisma.service';
import { externalApi } from '../../../utils/external-api';

interface Department {
  id: number;
  department_name: string;
  department_code: string;
  department_status: string;
}

// ฟังก์ชันดึงข้อมูล department
async function fetchDepartments(): Promise<Department[]> {
  // เรียก API ดึง departments
  try {
    const response = await externalApi.get<Department[]>('/departments');
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
