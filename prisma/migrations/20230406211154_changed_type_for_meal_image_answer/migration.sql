/*
  Warnings:

  - The `answer` column on the `ReplicateMealImageResponseAnalytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ReplicateMealImageResponseAnalytics" DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];
