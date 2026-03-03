import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { startOfWeek, subDays } from "date-fns";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getAthleteDashboard(athleteId: string) {
    const workouts = await this.prisma.workoutSession.findMany({
      where: {
        assignedProgram: {
          athleteId,
        },
        status: "COMPLETED",
      },
      select: {
        date: true,
        sessionVolume: true,
        sessionFatigue: true,
        sessionScore: true,
        acwr: true,
        riskLevel: true,
      } as any,
      orderBy: { date: "asc" } as any,
    });

    const weeklyMap = new Map<string, { volume: number; fatigue: number }>();

    for (const workout of workouts as any[]) {
      if (!workout.date) continue;

      const weekStart = startOfWeek(new Date(workout.date), {
        weekStartsOn: 1,
      }).toISOString();

      if (!weeklyMap.has(weekStart)) {
        weeklyMap.set(weekStart, { volume: 0, fatigue: 0 });
      }

      const current = weeklyMap.get(weekStart)!;

      current.volume += workout.sessionVolume ?? 0;
      current.fatigue += workout.sessionFatigue ?? 0;
    }

    const weeklyVolume: { weekStart: string; total: number }[] = [];
    const weeklyFatigue: { weekStart: string; total: number }[] = [];

    weeklyMap.forEach((value, key) => {
      weeklyVolume.push({ weekStart: key, total: value.volume });
      weeklyFatigue.push({ weekStart: key, total: value.fatigue });
    });

    const recentWorkouts = (workouts as any[]).slice(-7);

    const avgPerformanceScore =
      recentWorkouts.length > 0
        ? recentWorkouts.reduce((acc, w) => acc + (w.sessionScore ?? 0), 0) /
          recentWorkouts.length
        : 0;

    const latestWorkout =
      workouts.length > 0 ? (workouts[workouts.length - 1] as any) : null;

    const recentPRs = await this.prisma.workoutSet.findMany({
      where: {
        workoutSession: {
          assignedProgram: {
            athleteId,
          },
        },
        isPR: true,
      },
      orderBy: { createdAt: "desc" } as any,
      take: 5,
      include: {
        assignedExercise: {
          include: {
            exercise: true,
          },
        },
      } as any,
    });

    return {
      weeklyVolume,
      weeklyFatigue,
      acwr: latestWorkout?.acwr ?? null,
      riskLevel: latestWorkout?.riskLevel ?? null,
      avgPerformanceScore: Math.round(avgPerformanceScore),
      recentPRs: (recentPRs as any[]).map((pr) => ({
        exerciseName: pr.assignedExercise.exercise.name,
        load: pr.load,
        reps: pr.reps,
        date: pr.createdAt || new Date(),
      })),
    };
  }

  async getCoachDashboard(coachId: string) {
    const athletes = await this.prisma.athleteProfile.findMany({
      where: { coachId },
      include: {
        assignedPrograms: {
          select: {
            workoutSessions: {
              where: { status: "COMPLETED" },
              orderBy: { date: "desc" },
              take: 1,
              select: {
                date: true,
                acwr: true,
                riskLevel: true,
                sessionScore: true,
              },
            },
          },
        },
        insights: {
          where: { isRead: false },
          select: {
            severity: true,
          },
        },
      } as any,
    });

    const last7Days = subDays(new Date(), 7);

    const dashboardData = await Promise.all(
      athletes.map(async (athlete: any) => {
        const allSessions = athlete.assignedPrograms.flatMap(
          (p: any) => p.workoutSessions,
        );
        const latestSession = allSessions.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0];

        // Fetch last 7 days avg score separately for accuracy if needed,
        // but for now let's use the fetched sessions if we had more.
        // Let's do a quick separate query for avg score to be "professional"
        const recentScores = (await this.prisma.workoutSession.aggregate({
          where: {
            assignedProgram: { athleteId: athlete.id },
            status: "COMPLETED",
            date: { gte: last7Days },
          },
          _avg: {
            sessionScore: true,
          },
        } as any)) as any;

        const activeInsights = athlete.insights;
        const highestSeverity = activeInsights.reduce(
          (prev: string | null, curr: any) => {
            const levels: any = { LOW: 1, MEDIUM: 2, HIGH: 3 };
            return levels[curr.severity] > (levels[prev!] || 0)
              ? curr.severity
              : prev;
          },
          null,
        );

        return {
          id: athlete.id,
          name: athlete.name,
          level: athlete.level,
          lastWorkout: latestSession?.date || null,
          acwr: latestSession?.acwr || null,
          riskLevel: latestSession?.riskLevel || "UNKNOWN",
          avgScore7d: Math.round(recentScores._avg?.sessionScore || 0),
          unreadInsightsCount: activeInsights.length,
          highestSeverity,
        };
      }),
    );

    return dashboardData.sort((a, b) => {
      const riskOrder: any = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
        OPTIMAL: 0,
        UNKNOWN: 0,
      };
      return (riskOrder[b.riskLevel] || 0) - (riskOrder[a.riskLevel] || 0);
    });
  }
}
