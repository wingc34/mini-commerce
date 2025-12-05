/*
  Warnings:

  - A unique constraint covering the columns `[draftOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `draftOrderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "draftOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_draftOrderId_key" ON "Order"("draftOrderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_draftOrderId_fkey" FOREIGN KEY ("draftOrderId") REFERENCES "DraftOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
