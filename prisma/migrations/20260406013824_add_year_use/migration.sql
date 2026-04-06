-- DropIndex
DROP INDEX "HelpdeskRequest_numberSKT_idx";

-- AlterTable
ALTER TABLE "HelpdeskRequest" ADD COLUMN     "yearToyear" VARCHAR(255),
ADD COLUMN     "yearUse" INTEGER;

-- CreateIndex
CREATE INDEX "Floor_buildingId_idx" ON "Floor"("buildingId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_numberSKT_helpdeskStatusId_idx" ON "HelpdeskRequest"("numberSKT", "helpdeskStatusId");

-- CreateIndex
CREATE INDEX "Ticket_categoryId_idx" ON "Ticket"("categoryId");
