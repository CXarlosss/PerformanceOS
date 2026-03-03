import { AnalyticsService } from '../services/analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getWeeklyAnalytics(req: any): Promise<{
        weeklyVolume: number;
        volumeTrend: number;
        performanceScore: import("../../../../../../packages/core-engine/dist").PerformanceScore;
        pushPullRatio: number;
        overloadWarning: boolean;
    }>;
    getAthleteHistory(id: string, range: string): Promise<{
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
}
