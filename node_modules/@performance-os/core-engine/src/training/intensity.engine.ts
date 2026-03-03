import type { Session } from '../types/training.types';
import { calculateSetVolume } from './volume.engine';

/**
 * Epley formula for estimating 1RM
 * @see https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula
 */
export const estimate1RM = (load: number, reps: number): number => {
    if (reps === 1) return load;
    return load * (1 + reps / 30);
};

export const calculateRelativeIntensity = (load: number, estimated1RM: number): number => {
    if (estimated1RM === 0) return 0;
    return load / estimated1RM;
};

export const calculateAverageIntensityPerSession = (session: Session): number => {
    let totalVolume = 0;
    // let totalRepsLoad = 0; // Removed unused variable

    session.blocks.forEach(block => {
        block.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setVolume = calculateSetVolume(set);
                totalVolume += setVolume;
                // totalRepsLoad += set.load * set.reps; 
            });
        });
    });

    if (totalVolume === 0) return 0;

    const allSets = session.blocks.flatMap(b => b.exercises.flatMap(e => e.sets));
    if (allSets.length === 0) return 0;

    return allSets.reduce((acc, set) => acc + set.load, 0) / allSets.length;
};
