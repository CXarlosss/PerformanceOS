import { AnalyticsService } from '../services/analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getWeeklyAnalytics(req: any): Promise<{
        weeklyVolume: number;
        volumeTrend: number;
        performanceScore: import("@performance-os/core-engine").PerformanceScore;
        pushPullRatio: number;
        overloadWarning: boolean;
    }>;
    getAthleteHistory(id: string, range: string): Promise<{
        weeklyMetrics: any[];
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
}
