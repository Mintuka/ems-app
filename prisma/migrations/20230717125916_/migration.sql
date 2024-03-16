/*
  Warnings:

  - You are about to drop the column `date` on the `timekeeping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timekeeping" DROP COLUMN "date",
ALTER COLUMN "timeOut" DROP NOT NULL;
