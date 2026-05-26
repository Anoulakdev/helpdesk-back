-- DropIndex
DROP INDEX "Chat_helpdeskRequestId_senderId_idx";

-- DropIndex
DROP INDEX "HelpdeskRequest_numberSKT_helpdeskStatusId_createdById_tick_idx";

-- CreateIndex
CREATE INDEX "Chat_helpdeskRequestId_idx" ON "Chat"("helpdeskRequestId");

-- CreateIndex
CREATE INDEX "Chat_senderId_idx" ON "Chat"("senderId");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_numberSKT_idx" ON "HelpdeskRequest"("numberSKT");

-- CreateIndex
CREATE INDEX "HelpdeskRequest_helpdeskStatusId_idx" ON "HelpdeskRequest"("helpdeskStatusId");
