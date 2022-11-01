-- CreateTable
CREATE TABLE "UserAreasOfInterest" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "areasOfInterestId" INTEGER NOT NULL,

    CONSTRAINT "UserAreasOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAreasOfInterest_uuid_key" ON "UserAreasOfInterest"("uuid");

-- AddForeignKey
ALTER TABLE "UserAreasOfInterest" ADD CONSTRAINT "UserAreasOfInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAreasOfInterest" ADD CONSTRAINT "UserAreasOfInterest_areasOfInterestId_fkey" FOREIGN KEY ("areasOfInterestId") REFERENCES "AreasOfInterest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
