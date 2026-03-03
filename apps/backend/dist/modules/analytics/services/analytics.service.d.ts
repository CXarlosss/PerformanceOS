import { PrismaService } from "../../../prisma/prisma.service";
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWeeklyAnalytics(userId: string): Promise<{
        weeklyVolume: number;
        volumeTrend: number;
        performanceScore: import("@performance-os/core-engine").PerformanceScore;
        pushPullRatio: number;
        overloadWarning: boolean;
    }>;
    getAthleteHistory(athleteId: string, range?: string): Promise<{
        weeklyMetrics: never[];
        exerciseProgress: {};
        alerts: {};
        trendAnalysis: {};
    } | {
        weeklyMetrics: any[];
        exerciseProgress: Record<string, any[]>;
        alerts: {
            overloadRisk: boolean;
            chronicFatigueRisk: boolean;
            stagnationExercises: string[];
        };
        trendAnalysis: {
            volumeTrend: string;
            scoreTrend: string;
            fatigueTrend: string;
        };
    }>;
    private volumeAggregator;
    private getWeekNumber;
    private detectOverloadRisk;
    private detectChronicFatigue;
    private detectStagnation;
    private calculateTrend;
}
