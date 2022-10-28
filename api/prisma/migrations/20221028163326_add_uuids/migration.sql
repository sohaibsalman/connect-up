/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `UserProfile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_uuid_key" ON "UserProfile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "Users"("uuid");
