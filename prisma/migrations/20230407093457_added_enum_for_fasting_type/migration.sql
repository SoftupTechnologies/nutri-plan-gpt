/*
  Warnings:

  - You are about to drop the column `aiPrompt` on the `AIInteractionLogs` table. All the data in the column will be lost.
  - You are about to drop the column `aiProvider` on the `AIInteractionLogs` table. All the data in the column will be lost.
  - You are about to drop the column `aiResponse` on the `AIInteractionLogs` table. All the data in the column will be lost.
  - You are about to drop the column `aiResponseTime` on the `AIInteractionLogs` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `AIInteractionLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `AIInteractionLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `AIInteractionLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseTime` to the `AIInteractionLogs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fastingType` on the `UserNutritionData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FastingType" AS ENUM ('SIXTEEN_EIGHT', 'EIGHTEEN_SIX');

-- AlterTable
ALTER TABLE "AIInteractionLogs" DROP COLUMN "aiPrompt",
DROP COLUMN "aiProvider",
DROP COLUMN "aiResponse",
DROP COLUMN "aiResponseTime",
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "provider" "AIProvider" NOT NULL,
ADD COLUMN     "response" TEXT NOT NULL,
ADD COLUMN     "responseTime" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "UserNutritionData" DROP COLUMN "fastingType",
ADD COLUMN     "fastingType" "FastingType" NOT NULL;
