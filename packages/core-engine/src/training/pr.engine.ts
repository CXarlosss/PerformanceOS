import type { ExerciseInstance } from '../types/training.types';
import { estimate1RM } from './intensity.engine';

export type HistoricalPR = {
    exerciseId: string;
    estimated1RM: number;
};

export const detectPR = (
    exercise: ExerciseInstance,
    history: Record<string, number>,
    prThreshold: number
): boolean => {
    const currentBest1RM = exercise.sets.reduce((max, set) => {
        const e1RM = estimate1RM(set.load, set.reps);
        return e1RM > max ? e1RM : max;
    }, 0);

    const historicalBest = history[exercise.exerciseId] || 0;

    if (historicalBest === 0) return true;

    return currentBest1RM > historicalBest * (1 + prThreshold);
};

export const compareAgainstHistory = (
    sessionExercises: ExerciseInstance[],
    history: Record<string, number>,
    prThreshold: number
): string[] => {
    const newPRs: string[] = [];

    sessionExercises.forEach(exercise => {
        if (detectPR(exercise, history, prThreshold)) {
            newPRs.push(exercise.exerciseId);
        }
    });

    return newPRs;
};
