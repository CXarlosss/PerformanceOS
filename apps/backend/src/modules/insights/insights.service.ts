import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PlateauRule } from "./rules/plateau.rule";
import { AcwrRule } from "./rules/acwr.rule";
import { OverloadRule } from "./rules/overload.rule";
import { ProgressionRule } from "./rules/progression.rule";
import { AnalyticsData, InsightRule } from "./rules/insight-rule.interface";

@Injectable()
export class InsightsService {
  private rules: InsightRule[] = [
    new PlateauRule(),
    new AcwrRule(),
    new OverloadRule(),
    new ProgressionRule(),
  ];

  constructor(private prisma: PrismaService) {}

  async getActiveInsights(athleteId: string) {
    return (this.prisma as any).insight.findMany({
      where: {
        athleteId,
        isRead: false,
      },
      orderBy: [{ severity: "desc" } as any, { createdAt: "desc" } as any],
    });
  }

  async markAsRead(insightId: string) {
    return (this.prisma as any).insight.update({
      where: { id: insightId },
      data: { isRead: true },
    });
  }

  async generateInsights(athleteId: string, currentSessionId?: string) {
    const data = await this.collectAnalyticsData(athleteId);
    if (!data) return [];

    const generatedInsights = [];

    for (const rule of this.rules) {
      const result = rule.evaluate(data);
      if (result) {
        // Evitamos duplicar insights idénticos recientes (ej: mismo tipo en las últimas 24h)
        const recentDuplicate = await (this.prisma as any).insight.findFirst({
          where: {
            athleteId,
            type: result.type as any,
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        });

        if (!recentDuplicate) {
          const insight = await (this.prisma as any).insight.create({
            data: {
              athleteId,
              type: result.type as any,
              severity: result.severity as any,
              title: result.title,
              message: result.message,
              relatedSessionId: currentSessionId,
            },
          });
          generatedInsights.push(insight);
        }
      }
    }

    return generatedInsights;
  }

  private async collectAnalyticsData(
    athleteId: string,
  ): Promise<AnalyticsData | null> {
    const workouts = await this.prisma.workoutSession.findMany({
      where: {
        assignedProgram: { athleteId },
        status: "COMPLETED",
      },
      orderBy: { date: "desc" },
      take: 12, // Suficiente para 4 semanas si entrenan 3x semana
    });

    if (workouts.length === 0) return null;

    const latest = workouts[0] as any;
    const last4Weeks = workouts;

    const volumes = last4Weeks.map((w) => (w as any).sessionVolume || 0);
    const scores = last4Weeks.map((w) => (w as any).sessionScore || 0);

    const maxVolume = Math.max(...volumes);
    const minVolume = Math.min(...volumes);
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    const prCount = await this.prisma.workoutSet.count({
      where: {
        workoutSession: {
          assignedProgram: { athleteId },
          date: { gte: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000) },
        },
        isPR: true,
      },
    });

    return {
      athleteId,
      acwr: latest.acwr || 1,
      sessionVolume: latest.sessionVolume || 0,
      sessionFatigue: latest.sessionFatigue || 0,
      sessionScore: latest.sessionScore || 0,
      avgScoreLast4Weeks: avgScore,
      avgVolumeLast4Weeks: avgVolume,
      volumeVariance: avgVolume > 0 ? (maxVolume - minVolume) / avgVolume : 0,
      scoreVariance: avgScore > 0 ? (maxScore - minScore) / avgScore : 0,
      prCountLast4Weeks: prCount,
      fatigueTrend: "stable", // Placeholder para lógica más compleja
    };
  }
}
