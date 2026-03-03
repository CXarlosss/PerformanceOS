import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { WorkloadService } from "./workload.service";
import { InsightsService } from "../../insights/insights.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private workloadService: WorkloadService,
    private insightsService: InsightsService,
  ) {}

  ////////////////////////////////////////////////////////////
  // PUBLIC ENTRY POINT
  ////////////////////////////////////////////////////////////

  async completeWorkout(workoutId: string) {
    const workout = await this.prisma.workoutSession.findUnique({
      where: { id: workoutId },
      include: {
        sets: true,
        assignedProgram: {
          select: { athleteId: true },
        },
      },
    });

    if (!workout) throw new BadRequestException("Workout not found");
    if (workout.status === "COMPLETED")
      throw new BadRequestException("Workout already completed");
    if (!workout.sets.length)
      throw new BadRequestException("No sets registered");

    const athleteId = workout.assignedProgram.athleteId;

    const result = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const metrics = await this.calculateSessionMetrics(
          tx,
          workoutId,
          athleteId,
        );

        return tx.workoutSession.update({
          where: { id: workoutId },
          data: {
            ...metrics,
            status: "COMPLETED",
            completedAt: new Date(),
          } as any,
        });
      },
    );

    // 🔥 Trigger Insight Generation after transaction success
    try {
      await this.insightsService.generateInsights(athleteId, workoutId);
    } catch (e) {
      console.error("Error generating insights:", e);
      // We don't want to fail the workout completion if insights fail
    }

    return result;
  }

  ////////////////////////////////////////////////////////////
  // CORE CALCULATION
  ////////////////////////////////////////////////////////////

  private estimate1RM(load: number, reps: number): number {
    return load * (1 + reps / 30);
  }

  private async calculateSessionMetrics(
    tx: Prisma.TransactionClient,
    workoutId: string,
    athleteId: string,
  ) {
    const sets = await tx.workoutSet.findMany({
      where: { workoutSessionId: workoutId },
      select: {
        id: true,
        load: true,
        reps: true,
        rpe: true,
        assignedExerciseId: true,
      },
    });

    // 🔥 1. VOLUME + FATIGUE
    let sessionVolume = 0;
    let sessionFatigue = 0;
    let totalRPE = 0;

    for (const set of sets) {
      const volume = set.load * set.reps;
      const fatigue = volume * (set.rpe / 10);

      sessionVolume += volume;
      sessionFatigue += fatigue;
      totalRPE += set.rpe;
    }

    const avgRPE = sets.length > 0 ? totalRPE / sets.length : 0;

    // 🔥 2. PR DETECTION (NO N+1)
    const exerciseIds = [
      ...new Set(
        sets.map((s: { assignedExerciseId: string }) => s.assignedExerciseId),
      ),
    ];

    const historicalSets = await tx.workoutSet.findMany({
      where: {
        assignedExerciseId: { in: exerciseIds },
        workoutSession: {
          status: "COMPLETED",
        },
      },
      select: {
        assignedExerciseId: true,
        load: true,
        reps: true,
      },
    });

    const historicalMap = new Map<string, number>();

    for (const hSet of historicalSets) {
      const oneRM = this.estimate1RM(hSet.load, hSet.reps);
      const currentMax = historicalMap.get(hSet.assignedExerciseId) ?? 0;

      if (oneRM > currentMax) {
        historicalMap.set(hSet.assignedExerciseId, oneRM);
      }
    }

    // Detect PRs in current session
    for (const set of sets) {
      const current1RM = this.estimate1RM(set.load, set.reps);
      const historicalMax = historicalMap.get(set.assignedExerciseId) ?? 0;

      if (current1RM > historicalMax) {
        await tx.workoutSet.update({
          where: { id: set.id },
          data: { isPR: true },
        });
        historicalMap.set(set.assignedExerciseId, current1RM);
      }
    }

    // 🔥 3. PERFORMANCE SCORE + OVERLOAD
    const workout = await tx.workoutSession.findUnique({
      where: { id: workoutId },
      select: { assignedProgramId: true },
    });

    if (!workout) throw new Error("Internal transaction error: session lost");

    const previousWorkouts = await tx.workoutSession.findMany({
      where: {
        assignedProgramId: workout.assignedProgramId,
        status: "COMPLETED",
      },
      orderBy: { date: "desc" },
      take: 4,
      select: { sessionVolume: true, sessionFatigue: true },
    });

    const avgHistoricalVolume =
      previousWorkouts.length > 0
        ? previousWorkouts.reduce(
            (acc: number, w: { sessionVolume: number | null }) =>
              acc + (w.sessionVolume ?? 0),
            0,
          ) / previousWorkouts.length
        : sessionVolume;

    const normalizedVolume =
      avgHistoricalVolume > 0 ? sessionVolume / avgHistoricalVolume : 1;

    const normalizedIntensity = avgRPE / 10;

    const rawScore = normalizedVolume * 0.6 + normalizedIntensity * 0.4;
    const sessionScore = Math.min(Math.round(rawScore * 100), 100);

    const overloadFlag = sessionVolume > avgHistoricalVolume * 1.25;

    // 🔥 4. ACWR & RISK LEVEL
    const { acwr, riskLevel } = await this.workloadService.calculateACWR(
      tx,
      athleteId,
      sessionFatigue,
    );

    return {
      sessionVolume,
      sessionFatigue,
      sessionScore,
      overloadFlag,
      acwr,
      riskLevel,
      fatigueModelVersion: 1,
    };
  }
}
