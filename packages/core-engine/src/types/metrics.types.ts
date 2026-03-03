export type SessionMetrics = {
    sessionVolume: number;
    averageIntensity: number;
    fatigueScore: number;
    newPRs: string[];
};

export type MicrocycleMetrics = {
    weeklyVolume: number;
    overloadWarning: boolean;
    progressionPercentage: number;
};

export type ConsolidatedMetrics = SessionMetrics & MicrocycleMetrics;
