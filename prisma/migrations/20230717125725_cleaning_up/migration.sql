/*
  Warnings:

  - You are about to drop the `Leave` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vacation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RequestType" ADD VALUE 'Vacation';
ALTER TYPE "RequestType" ADD VALUE 'Leave';

-- DropForeignKey
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_employeeID_fkey";

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Leave";

-- DropTable
DROP TABLE "Vacation";
