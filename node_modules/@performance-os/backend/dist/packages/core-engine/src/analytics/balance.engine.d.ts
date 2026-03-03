import type { Session, ExerciseMetadata } from '../types/training.types';
export type BalanceResult = {
    volumeByCategory: Record<string, number>;
    pushPullRatio: number;
    imbalanceWarning: boolean;
};
export declare const calculateVolumeByMuscleGroup: (session: Session, exerciseLookup: Record<string, ExerciseMetadata>) => Record<string, number>;
export declare const calculatePushPullRatio: (volumes: Record<string, number>) => number;
export declare const detectMuscleImbalance: (ratio: number) => boolean;
