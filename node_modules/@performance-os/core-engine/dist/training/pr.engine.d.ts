import type { ExerciseInstance } from '../types/training.types';
export type HistoricalPR = {
    exerciseId: string;
    estimated1RM: number;
};
export declare const detectPR: (exercise: ExerciseInstance, history: Record<string, number>, prThreshold: number) => boolean;
export declare const compareAgainstHistory: (sessionExercises: ExerciseInstance[], history: Record<string, number>, prThreshold: number) => string[];
