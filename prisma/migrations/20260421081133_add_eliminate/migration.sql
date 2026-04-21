-- DropIndex
DROP INDEX "HelpdeskRequest_numberSKT_helpdeskStatusId_idx";

-- AlterTable
ALTER TABLE "HelpdeskRequest" ADD COLUMN     "brandId" INTEGER,
ADD COLUMN     "typeDeviceId" INTEGER,
ALTER COLUMN "telephone" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "TypeDevice" (
    "id" SERIAL NOT NULL,
    "headCategoryId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "TypeDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "typeDeviceId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eliminate" (
    "id" SERIAL NOT NULL,
    "helpdeskRequestId" INTEGER NOT NULL,
    "comment" TEXT,
    "eliminatefile" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Eliminate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TypeDevice_headCategoryId_idx" ON "TypeDevice"("headCategoryId");

-- CreateIndex
CREATE INDEX "Brand_typeDeviceId_idx" ON "Brand"("typeDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Eliminate_helpdeskRequestId_key" ON "Eliminate"("helpdeskRequestId");

-- CreateIndex
CREATE INDEX "Eliminate_helpdeskRequestId_idx" ON "Eliminate"("helpdeskRequestId");

-- CreateIndex
CREATE INDEX "Category_headCategoryId_idx" ON "Category"("headCategoryId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_numberSKT_helpdeskStatusId_createdById_tick_idx" ON "HelpdeskRequest"("numberSKT", "helpdeskStatusId", "createdById", "ticketId");

-- AddForeignKey
ALTER TABLE "TypeDevice" ADD CONSTRAINT "TypeDevice_headCategoryId_fkey" FOREIGN KEY ("headCategoryId") REFERENCES "HeadCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeDevice" ADD CONSTRAINT "TypeDevice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_typeDeviceId_fkey" FOREIGN KEY ("typeDeviceId") REFERENCES "TypeDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eliminate" ADD CONSTRAINT "Eliminate_helpdeskRequestId_fkey" FOREIGN KEY ("helpdeskRequestId") REFERENCES "HelpdeskRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eliminate" ADD CONSTRAINT "Eliminate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_typeDeviceId_fkey" FOREIGN KEY ("typeDeviceId") REFERENCES "TypeDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpdeskRequest" ADD CONSTRAINT "HelpdeskRequest_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
