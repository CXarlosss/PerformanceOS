import type { Session } from '../types/training.types';
export declare const estimate1RM: (load: number, reps: number) => number;
export declare const calculateRelativeIntensity: (load: number, estimated1RM: number) => number;
export declare const calculateAverageIntensityPerSession: (session: Session) => number;
