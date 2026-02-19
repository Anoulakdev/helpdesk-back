/*
  Warnings:

  - A unique constraint covering the columns `[helpdeskRequestId,assignedToId]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignment_helpdeskRequestId_assignedToId_key" ON "Assignment"("helpdeskRequestId", "assignedToId");
