import { PrismaClient } from '@prisma/client';
import { createDepartment } from '../src/modules/department/services/create';
import { createDivision } from '../src/modules/division/services/create';
import { createOffice } from '../src/modules/office/services/create';
import { createUnit } from '../src/modules/unit/services/create';
import { createPositionGroup } from '../src/modules/positiongroup/services/create';
import { createPositionCode } from '../src/modules/positioncode/services/create';
import { createPosition } from '../src/modules/position/services/create';
import { createEmployee } from '../src/modules/employee/services/create';
import { createUser } from '../src/modules/user/services/create';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Roles
  console.log('📦 Seeding Roles...');
  const roles = [
    { id: 1, name: 'SuperAdmin', description: 'ຊູບເປີແອັດມີນ' },
    { id: 2, name: 'Admin', description: 'ແອັດມີນ' },
    { id: 3, name: 'Staff', description: 'ຊ່າງ/ວິຊາການ' },
    { id: 4, name: 'User', description: 'ຜູ້ໃຊ້ງານ' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {
        name: role.name,
        description: role.description,
      },
      create: role,
    });
  }
  console.log('✅ Roles seeded successfully.');

  // 2. Sync Departments
  console.log('📦 Syncing Departments...');
  try {
    const deptResult = await createDepartment(prisma as any);
    console.log(`✅ Departments: ${deptResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Department sync skipped/error: ${msg}`);
  }

  // 3. Sync Divisions
  console.log('📦 Syncing Divisions...');
  try {
    const divResult = await createDivision(prisma as any);
    console.log(`✅ Divisions: ${divResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Division sync skipped/error: ${msg}`);
  }

  // 4. Sync Offices
  console.log('📦 Syncing Offices...');
  try {
    const officeResult = await createOffice(prisma as any);
    console.log(`✅ Offices: ${officeResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Office sync skipped/error: ${msg}`);
  }

  // 5. Sync Units
  console.log('📦 Syncing Units...');
  try {
    const unitResult = await createUnit(prisma as any);
    console.log(`✅ Units: ${unitResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Unit sync skipped/error: ${msg}`);
  }

  // 6. Sync PositionGroups
  console.log('📦 Syncing PositionGroups...');
  try {
    const pgResult = await createPositionGroup(prisma as any);
    console.log(`✅ PositionGroups: ${pgResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ PositionGroup sync skipped/error: ${msg}`);
  }

  // 7. Sync PositionCodes
  console.log('📦 Syncing PositionCodes...');
  try {
    const pcResult = await createPositionCode(prisma as any);
    console.log(`✅ PositionCodes: ${pcResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ PositionCode sync skipped/error: ${msg}`);
  }

  // 8. Sync Positions
  console.log('📦 Syncing Positions...');
  try {
    const posResult = await createPosition(prisma as any);
    console.log(`✅ Positions: ${posResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Position sync skipped/error: ${msg}`);
  }

  // 9. Sync Employees
  console.log('📦 Syncing Employees...');
  try {
    const empResult = await createEmployee(prisma as any);
    console.log(`✅ Employees: ${empResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ Employee sync skipped/error: ${msg}`);
  }

  // 10. Sync Users
  console.log('📦 Syncing Users...');
  try {
    const userResult = await createUser(prisma as any);
    console.log(`✅ Users: ${userResult.message}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`⚠️ User sync skipped/error: ${msg}`);
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
