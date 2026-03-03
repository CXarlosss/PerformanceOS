import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { Prisma, WorkoutSession } from "@prisma/client";

@Injectable()
export class WorkloadService {
  constructor(private prisma: PrismaService) {}

  /**
   * Acute Load: Sum of fatigue in the last 7 days
   */
  async calculateAcuteLoad(
    tx: Prisma.TransactionClient,
    athleteId: string,
  ): Promise<number> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const workouts = await tx.workoutSession.findMany({
      where: {
        assignedProgram: {
          athleteId,
        },
        status: "COMPLETED",
        date: { gte: sevenDaysAgo },
      },
      select: { sessionFatigue: true },
    });

    return workouts.reduce(
      (acc: number, w: { sessionFatigue: number | null }) =>
        acc + (w.sessionFatigue ?? 0),
      0,
    );
  }

  /**
   * Chronic Load: Average daily fatigue in the last 28 days
   * (Standard model: 4-week average of weekly loads / 4)
   */
  async calculateChronicLoad(
    tx: Prisma.TransactionClient,
    athleteId: string,
  ): Promise<number> {
    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);

    const workouts = await tx.workoutSession.findMany({
      where: {
        assignedProgram: {
          athleteId,
        },
        status: "COMPLETED",
        date: { gte: twentyEightDaysAgo },
      },
      select: { sessionFatigue: true },
    });

    const totalFatigue = workouts.reduce(
      (acc: number, w: { sessionFatigue: number | null }) =>
        acc + (w.sessionFatigue ?? 0),
      0,
    );

    // We average by 4 weeks to get the chronic baseline
    return totalFatigue / 4;
  }

  /**
   * ACWR = Acute / Chronic
   */
  async calculateACWR(
    tx: Prisma.TransactionClient,
    athleteId: string,
    currentSessionFatigue: number,
  ) {
    const acute = await this.calculateAcuteLoad(tx, athleteId);
    // Add current session to acute if not already counted (depends on call timing)
    const totalAcute = acute + currentSessionFatigue;

    const chronic = await this.calculateChronicLoad(tx, athleteId);

    if (chronic === 0) return { acwr: 1, riskLevel: "OPTIMAL" };

    const acwr = totalAcute / chronic;

    let riskLevel = "OPTIMAL";
    if (acwr > 1.5) riskLevel = "HIGH";
    else if (acwr < 0.8) riskLevel = "LOW";

    return { acwr, riskLevel };
  }
}
