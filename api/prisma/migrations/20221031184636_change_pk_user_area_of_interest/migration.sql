/*
  Warnings:

  - The primary key for the `UserAreasOfInterest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserAreasOfInterest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAreasOfInterest" DROP CONSTRAINT "UserAreasOfInterest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserAreasOfInterest_pkey" PRIMARY KEY ("userId", "areasOfInterestId");
