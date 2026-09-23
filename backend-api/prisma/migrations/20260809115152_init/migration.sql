/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Good` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Need` will be added. If there are existing duplicate values, this will fail.
  - The required column `publicId` was added to the `Good` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `Need` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- Add the columns as nullable so this migration also works on populated databases.
ALTER TABLE "Good" ADD COLUMN "publicId" TEXT;
UPDATE "Good"
SET "publicId" = md5(random()::text || clock_timestamp()::text || "id"::text)
WHERE "publicId" IS NULL;
ALTER TABLE "Good" ALTER COLUMN "publicId" SET NOT NULL;

ALTER TABLE "Need" ADD COLUMN "publicId" TEXT;
UPDATE "Need"
SET "publicId" = md5(random()::text || clock_timestamp()::text || "id"::text)
WHERE "publicId" IS NULL;
ALTER TABLE "Need" ALTER COLUMN "publicId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Good_publicId_key" ON "Good"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Need_publicId_key" ON "Need"("publicId");
