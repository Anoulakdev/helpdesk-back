-- CreateIndex
CREATE INDEX "Assignment_assignedToId_idx" ON "Assignment"("assignedToId");

-- CreateIndex
CREATE INDEX "Assignment_helpdeskStatusId_idx" ON "Assignment"("helpdeskStatusId");

-- CreateIndex
CREATE INDEX "Brand_createdById_idx" ON "Brand"("createdById");

-- CreateIndex
CREATE INDEX "Category_createdById_idx" ON "Category"("createdById");

-- CreateIndex
CREATE INDEX "Category_catIconId_idx" ON "Category"("catIconId");

-- CreateIndex
CREATE INDEX "Chat_helpdeskRequestId_idx" ON "Chat"("helpdeskRequestId");

-- CreateIndex
CREATE INDEX "Chat_senderId_idx" ON "Chat"("senderId");

-- CreateIndex
CREATE INDEX "Division_departmentId_idx" ON "Division"("departmentId");

-- CreateIndex
CREATE INDEX "Eliminate_createdById_idx" ON "Eliminate"("createdById");

-- CreateIndex
CREATE INDEX "Eliminate_createdAt_idx" ON "Eliminate"("createdAt");

-- CreateIndex
CREATE INDEX "Employee_posId_idx" ON "Employee"("posId");

-- CreateIndex
CREATE INDEX "Employee_departmentId_idx" ON "Employee"("departmentId");

-- CreateIndex
CREATE INDEX "Employee_divisionId_idx" ON "Employee"("divisionId");

-- CreateIndex
CREATE INDEX "Employee_officeId_idx" ON "Employee"("officeId");

-- CreateIndex
CREATE INDEX "Employee_unitId_idx" ON "Employee"("unitId");

-- CreateIndex
CREATE INDEX "HeadCategory_departmentId_idx" ON "HeadCategory"("departmentId");

-- CreateIndex
CREATE INDEX "HeadCategory_divisionId_idx" ON "HeadCategory"("divisionId");

-- CreateIndex
CREATE INDEX "HelpdeskImg_helpdeskRequestId_idx" ON "HelpdeskImg"("helpdeskRequestId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_ticketId_idx" ON "HelpdeskRequest"("ticketId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_helpdeskStatusId_idx" ON "HelpdeskRequest"("helpdeskStatusId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_buildingId_idx" ON "HelpdeskRequest"("buildingId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_floorId_idx" ON "HelpdeskRequest"("floorId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_turningId_idx" ON "HelpdeskRequest"("turningId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_typeDeviceId_idx" ON "HelpdeskRequest"("typeDeviceId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_brandId_idx" ON "HelpdeskRequest"("brandId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_priorityId_idx" ON "HelpdeskRequest"("priorityId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_createdById_idx" ON "HelpdeskRequest"("createdById");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_createdAt_idx" ON "HelpdeskRequest"("createdAt");

-- CreateIndex
CREATE INDEX "Office_divisionId_idx" ON "Office"("divisionId");

-- CreateIndex
CREATE INDEX "Position_poscodeId_idx" ON "Position"("poscodeId");

-- CreateIndex
CREATE INDEX "PositionCode_posgroupId_idx" ON "PositionCode"("posgroupId");

-- CreateIndex
CREATE INDEX "Ticket_createdById_idx" ON "Ticket"("createdById");

-- CreateIndex
CREATE INDEX "TypeDevice_createdById_idx" ON "TypeDevice"("createdById");

-- CreateIndex
CREATE INDEX "Unit_divisionId_idx" ON "Unit"("divisionId");

-- CreateIndex
CREATE INDEX "Unit_officeId_idx" ON "Unit"("officeId");

-- CreateIndex
CREATE INDEX "User_employeeId_idx" ON "User"("employeeId");

-- CreateIndex
CREATE INDEX "User_roleId_idx" ON "User"("roleId");
