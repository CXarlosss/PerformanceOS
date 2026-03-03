/*
  Warnings:

  - You are about to drop the column `templateSessionId` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseName` on the `WorkoutSet` table. All the data in the column will be lost.
  - Added the required column `assignedExerciseId` to the `WorkoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_templateSessionId_fkey";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "templateSessionId";

-- AlterTable
ALTER TABLE "WorkoutSet" DROP COLUMN "exerciseName",
ADD COLUMN     "assignedExerciseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_assignedExerciseId_fkey" FOREIGN KEY ("assignedExerciseId") REFERENCES "AssignedExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
