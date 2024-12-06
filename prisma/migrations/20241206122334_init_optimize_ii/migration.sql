/*
  Warnings:

  - You are about to drop the column `receiverStatus` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderStatus` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverStatus",
DROP COLUMN "senderStatus",
ADD COLUMN     "receiverDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "senderDelete" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "MessageStatus";
