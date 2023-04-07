-- CreateTable
CREATE TABLE "OpenAIResponseAnalytics" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "timeToRespond" INTEGER NOT NULL,

    CONSTRAINT "OpenAIResponseAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplicateIngredientsImageResponseAnalytics" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "timeToRespond" INTEGER NOT NULL,

    CONSTRAINT "ReplicateIngredientsImageResponseAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplicateMealImageResponseAnalytics" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "timeToRespond" INTEGER NOT NULL,

    CONSTRAINT "ReplicateMealImageResponseAnalytics_pkey" PRIMARY KEY ("id")
);
