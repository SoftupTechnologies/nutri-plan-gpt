/*
  Warnings:

  - You are about to drop the column `userNutritionDataId` on the `AIInteractionLogs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AIInteractionLogs_userNutritionDataId_key";

-- AlterTable
ALTER TABLE "AIInteractionLogs" DROP COLUMN "userNutritionDataId";

-- AlterTable
ALTER TABLE "UserNutritionData" ADD COLUMN     "email" TEXT;
