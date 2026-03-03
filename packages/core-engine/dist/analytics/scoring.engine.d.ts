export type PerformanceScore = {
    totalScore: number;
    progressionScore: number;
    consistencyScore: number;
    fatigueManagementScore: number;
    intensityAlignmentScore: number;
    interpretation: string;
};
export declare const calculatePerformanceScore: (progression: number, consistency: number, fatigueFactor: number, intensityAlignment: number) => PerformanceScore;
