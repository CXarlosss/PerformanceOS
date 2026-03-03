import type { PerformanceScore } from '@performance-os/core-engine';

export type DashboardMetrics = {
    weeklyVolume: number;
    volumeTrend: number;
    fatigueScore: number;
    pushPullRatio: number;
    imbalanceWarning: boolean;
    newPRs: string[];
    performanceScore: PerformanceScore;
};

export type TrendDataPoint = {
    microcycleId: string,
    label: string,
    volume: number,
    intensity: number
};
