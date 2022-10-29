/*
  Warnings:

  - Added the required column `addressCity` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressCountry` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressState` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedInProfile` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "addressCity" TEXT NOT NULL,
ADD COLUMN     "addressCountry" TEXT NOT NULL,
ADD COLUMN     "addressState" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "linkedInProfile" TEXT NOT NULL;
