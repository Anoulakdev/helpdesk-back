-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "commentImg" VARCHAR(255),
ADD COLUMN     "helpdeskStatusId" INTEGER,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "updatedAt" TIMESTAMPTZ(0);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_helpdeskStatusId_fkey" FOREIGN KEY ("helpdeskStatusId") REFERENCES "HelpdeskStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
