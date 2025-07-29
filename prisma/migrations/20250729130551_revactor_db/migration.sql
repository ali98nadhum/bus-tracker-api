/*
  Warnings:

  - You are about to drop the column `currentLat` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `currentLng` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `draverImage` on the `Bus` table. All the data in the column will be lost.
  - Added the required column `resetPasswordExpires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationTokenExpires` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "currentLat",
DROP COLUMN "currentLng",
DROP COLUMN "draverImage",
ADD COLUMN     "driverImage" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerifird" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetPasswordExpires" TEXT NOT NULL,
ADD COLUMN     "resetPasswordToken" TEXT NOT NULL,
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "verificationTokenExpires" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "User_fave_destination" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_fave_destination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_fave_destination_userId_destinationId_key" ON "User_fave_destination"("userId", "destinationId");

-- AddForeignKey
ALTER TABLE "User_fave_destination" ADD CONSTRAINT "User_fave_destination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_fave_destination" ADD CONSTRAINT "User_fave_destination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
