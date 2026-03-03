import type { Session, ExerciseMetadata } from '../types/training.types';
export declare const calculateInternalLoad: (rpe: number, reps: number, load: number) => number;
export declare const calculateExerciseFatigue: (rpe: number, reps: number, load: number, coefficient: number) => number;
export declare const calculateSessionFatigue: (session: Session, exerciseLookup: Record<string, ExerciseMetadata>) => number;
