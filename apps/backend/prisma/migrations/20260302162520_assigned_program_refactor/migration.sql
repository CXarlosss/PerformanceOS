/*
  Warnings:

  - Added the required column `assignedSessionId` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_templateSessionId_fkey";

-- AlterTable
ALTER TABLE "AthleteProfile" ADD COLUMN     "coachId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutSession" ADD COLUMN     "assignedSessionId" TEXT NOT NULL,
ALTER COLUMN "templateSessionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AssignedMicrocycle" (
    "id" TEXT NOT NULL,
    "assignedProgramId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,

    CONSTRAINT "AssignedMicrocycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedSession" (
    "id" TEXT NOT NULL,
    "microcycleId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "AssignedSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedBlock" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AssignedBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedExercise" (
    "id" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "targetSets" INTEGER NOT NULL,
    "targetReps" INTEGER NOT NULL,
    "targetRpe" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssignedExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AthleteProfile" ADD CONSTRAINT "AthleteProfile_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_assignedSessionId_fkey" FOREIGN KEY ("assignedSessionId") REFERENCES "AssignedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_templateSessionId_fkey" FOREIGN KEY ("templateSessionId") REFERENCES "TemplateSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedMicrocycle" ADD CONSTRAINT "AssignedMicrocycle_assignedProgramId_fkey" FOREIGN KEY ("assignedProgramId") REFERENCES "AssignedProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedSession" ADD CONSTRAINT "AssignedSession_microcycleId_fkey" FOREIGN KEY ("microcycleId") REFERENCES "AssignedMicrocycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedBlock" ADD CONSTRAINT "AssignedBlock_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssignedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedExercise" ADD CONSTRAINT "AssignedExercise_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "AssignedBlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
