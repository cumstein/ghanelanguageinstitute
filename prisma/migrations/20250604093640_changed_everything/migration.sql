/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "schedule" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_key" ON "Enrollment"("studentId");
