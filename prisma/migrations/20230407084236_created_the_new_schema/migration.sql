/*
  Warnings:

  - You are about to drop the `OpenAIResponseAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplicateIngredientsImageResponseAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplicateMealImageResponseAnalytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('OpenAI', 'Replicate');

-- DropTable
DROP TABLE "OpenAIResponseAnalytics";

-- DropTable
DROP TABLE "ReplicateIngredientsImageResponseAnalytics";

-- DropTable
DROP TABLE "ReplicateMealImageResponseAnalytics";

-- CreateTable
CREATE TABLE "AIInteractionLogs" (
    "id" SERIAL NOT NULL,
    "aiPrompt" TEXT NOT NULL,
    "aiResponse" INTEGER NOT NULL,
    "aiProvider" "AIProvider" NOT NULL,
    "aiResponseTime" DOUBLE PRECISION NOT NULL,
    "endpointName" TEXT NOT NULL,
    "endpointResponse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIInteractionLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNutritionData" (
    "id" SERIAL NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "targetWeight" INTEGER NOT NULL,
    "periodToLoseWeight" INTEGER NOT NULL,
    "fastingType" TEXT NOT NULL,
    "ingredients" INTEGER NOT NULL,

    CONSTRAINT "UserNutritionData_pkey" PRIMARY KEY ("id")
);
