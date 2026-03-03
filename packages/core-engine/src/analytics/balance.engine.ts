import type { Session, ExerciseMetadata } from '../types/training.types';
import { calculateExerciseVolume } from '../training/volume.engine';

export type BalanceResult = {
    volumeByCategory: Record<string, number>;
    pushPullRatio: number;
    imbalanceWarning: boolean;
};

export const calculateVolumeByMuscleGroup = (
    session: Session,
    exerciseLookup: Record<string, ExerciseMetadata>
): Record<string, number> => {
    const volumes: Record<string, number> = {};

    session.blocks.forEach(block => {
        block.exercises.forEach(instance => {
            const meta = exerciseLookup[instance.exerciseId];
            const category = meta ? meta.category : 'Otros';
            const volume = calculateExerciseVolume(instance);

            volumes[category] = (volumes[category] || 0) + volume;
        });
    });

    return volumes;
};

export const calculatePushPullRatio = (volumes: Record<string, number>): number => {
    const push = volumes['Empuje'] || 0;
    const pull = volumes['Tracción'] || 0;
    if (pull === 0) return push > 0 ? 100 : 1; // Default neutral if both 0
    return push / pull;
};

export const detectMuscleImbalance = (ratio: number): boolean => {
    // Ideally ratio should be between 0.8 and 1.2 for balance
    return ratio < 0.7 || ratio > 1.4;
};
