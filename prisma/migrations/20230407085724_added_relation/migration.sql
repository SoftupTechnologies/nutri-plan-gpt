/*
  Warnings:

  - A unique constraint covering the columns `[userNutritionDataId]` on the table `AIInteractionLogs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userNutritionDataId` to the `AIInteractionLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIInteractionLogs" ADD COLUMN     "userNutritionDataId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AIInteractionLogs_userNutritionDataId_key" ON "AIInteractionLogs"("userNutritionDataId");
