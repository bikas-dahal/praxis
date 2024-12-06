-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('ACTIVE', 'DELETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imagePublicId" TEXT;

-- AlterTable
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT,
    "receiverId" TEXT,
    "dateRead" TIMESTAMP(3),
    "senderStatus" "MessageStatus" NOT NULL DEFAULT 'ACTIVE',
    "receiverStatus" "MessageStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Blog_isPublished_authorId_idx" ON "Blog"("isPublished", "authorId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
