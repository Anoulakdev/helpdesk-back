-- DropIndex
DROP INDEX "Assignment_assignedToId_idx";

-- DropIndex
DROP INDEX "Assignment_helpdeskStatusId_idx";

-- DropIndex
DROP INDEX "Brand_createdById_idx";

-- DropIndex
DROP INDEX "Category_catIconId_idx";

-- DropIndex
DROP INDEX "Category_createdById_idx";

-- DropIndex
DROP INDEX "Chat_helpdeskRequestId_idx";

-- DropIndex
DROP INDEX "Chat_senderId_idx";

-- DropIndex
DROP INDEX "Division_departmentId_idx";

-- DropIndex
DROP INDEX "Eliminate_createdById_idx";

-- DropIndex
DROP INDEX "Employee_departmentId_idx";

-- DropIndex
DROP INDEX "Employee_divisionId_idx";

-- DropIndex
DROP INDEX "Employee_officeId_idx";

-- DropIndex
DROP INDEX "Employee_posId_idx";

-- DropIndex
DROP INDEX "Employee_unitId_idx";

-- DropIndex
DROP INDEX "HeadCategory_departmentId_idx";

-- DropIndex
DROP INDEX "HeadCategory_divisionId_idx";

-- DropIndex
DROP INDEX "HelpdeskImg_helpdeskRequestId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_brandId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_buildingId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_floorId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_helpdeskStatusId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_priorityId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_turningId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_typeDeviceId_idx";

-- DropIndex
DROP INDEX "Office_divisionId_idx";

-- DropIndex
DROP INDEX "Position_poscodeId_idx";

-- DropIndex
DROP INDEX "PositionCode_posgroupId_idx";

-- DropIndex
DROP INDEX "Ticket_createdById_idx";

-- DropIndex
DROP INDEX "TypeDevice_createdById_idx";

-- DropIndex
DROP INDEX "Unit_divisionId_idx";

-- DropIndex
DROP INDEX "Unit_officeId_idx";

-- DropIndex
DROP INDEX "User_employeeId_idx";

-- DropIndex
DROP INDEX "User_roleId_idx";

-- CreateIndex
CREATE INDEX "Chat_helpdeskRequestId_senderId_idx" ON "Chat"("helpdeskRequestId", "senderId");
