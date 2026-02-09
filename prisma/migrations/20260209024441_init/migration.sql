-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "employeeId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "emp_code" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "gender" VARCHAR(255),
    "tel" VARCHAR(255),
    "email" VARCHAR(255),
    "empimg" VARCHAR(255),
    "posId" INTEGER,
    "departmentId" INTEGER,
    "divisionId" INTEGER,
    "officeId" INTEGER,
    "unitId" INTEGER,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL,
    "department_name" VARCHAR(255),
    "department_code" VARCHAR(50),
    "department_status" VARCHAR(50) NOT NULL DEFAULT 'A',

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" INTEGER NOT NULL,
    "division_name" VARCHAR(255),
    "division_code" VARCHAR(50),
    "division_status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "branch_id" INTEGER,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" INTEGER NOT NULL,
    "office_name" VARCHAR(255),
    "office_code" VARCHAR(50),
    "office_status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "divisionId" INTEGER,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL,
    "unit_name" VARCHAR(255),
    "unit_code" VARCHAR(50),
    "unit_status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "unit_type" VARCHAR(50),
    "divisionId" INTEGER,
    "officeId" INTEGER,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionGroup" (
    "id" INTEGER NOT NULL,
    "pos_group_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "PositionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionCode" (
    "id" INTEGER NOT NULL,
    "pos_code_name" VARCHAR(255) NOT NULL,
    "pos_code_status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "posgroupId" INTEGER,

    CONSTRAINT "PositionCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL,
    "pos_name" VARCHAR(255) NOT NULL,
    "pos_status" VARCHAR(50) NOT NULL DEFAULT 'A',
    "poscodeId" INTEGER,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "departmentId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,

    CONSTRAINT "HeadCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "headCategoryId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "catIconId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryIcon" (
    "id" SERIAL NOT NULL,
    "catIcon" VARCHAR(255) NOT NULL,

    CONSTRAINT "CategoryIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turning" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Turning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpdeskStatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "HelpdeskStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpdeskRequest" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "helpdeskStatusId" INTEGER NOT NULL DEFAULT 1,
    "buildingId" INTEGER NOT NULL,
    "floorId" INTEGER NOT NULL,
    "turningId" INTEGER NOT NULL,
    "numberSKT" VARCHAR(255) NOT NULL,
    "telephone" INTEGER NOT NULL,
    "details" TEXT,
    "hdFile" VARCHAR(255),
    "priorityId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "HelpdeskRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Priority" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpdeskImg" (
    "id" SERIAL NOT NULL,
    "helpdeskRequestId" INTEGER NOT NULL,
    "hdImg" VARCHAR(255) NOT NULL,

    CONSTRAINT "HelpdeskImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "helpdeskRequestId" INTEGER NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "helpdeskRequestId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emp_code_key" ON "Employee"("emp_code");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_numberSKT_idx" ON "HelpdeskRequest"("numberSKT");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_posId_fkey" FOREIGN KEY ("posId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionCode" ADD CONSTRAINT "PositionCode_posgroupId_fkey" FOREIGN KEY ("posgroupId") REFERENCES "PositionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_poscodeId_fkey" FOREIGN KEY ("poscodeId") REFERENCES "PositionCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadCategory" ADD CONSTRAINT "HeadCategory_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadCategory" ADD CONSTRAINT "HeadCategory_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_headCategoryId_fkey" FOREIGN KEY ("headCategoryId") REFERENCES "HeadCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_catIconId_fkey" FOREIGN KEY ("catIconId") REFERENCES "CategoryIcon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_helpdeskStatusId_fkey" FOREIGN KEY ("helpdeskStatusId") REFERENCES "HelpdeskStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_turningId_fkey" FOREIGN KEY ("turningId") REFERENCES "Turning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskImg" ADD CONSTRAINT "HelpdeskImg_helpdeskRequestId_fkey" FOREIGN KEY ("helpdeskRequestId") REFERENCES "HelpdeskRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_helpdeskRequestId_fkey" FOREIGN KEY ("helpdeskRequestId") REFERENCES "HelpdeskRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_helpdeskRequestId_fkey" FOREIGN KEY ("helpdeskRequestId") REFERENCES "HelpdeskRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
