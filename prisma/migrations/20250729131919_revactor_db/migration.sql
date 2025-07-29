-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetPasswordExpires" DROP NOT NULL,
ALTER COLUMN "resetPasswordToken" DROP NOT NULL,
ALTER COLUMN "verificationToken" DROP NOT NULL,
ALTER COLUMN "verificationTokenExpires" DROP NOT NULL;
