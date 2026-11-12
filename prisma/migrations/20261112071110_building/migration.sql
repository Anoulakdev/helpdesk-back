-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "divisionId" INTEGER;

-- CreateIndex
CREATE INDEX "Building_divisionId_idx" ON "Building"("divisionId");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;
