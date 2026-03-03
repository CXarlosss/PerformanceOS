import type { Session, ExerciseMetadata } from '../types/training.types';

export const calculateInternalLoad = (rpe: number, reps: number, load: number): number => {
    return rpe * reps * load;
};

export const calculateExerciseFatigue = (rpe: number, reps: number, load: number, coefficient: number): number => {
    return calculateInternalLoad(rpe, reps, load) * (coefficient / 10);
};

export const calculateSessionFatigue = (
    session: Session,
    exerciseLookup: Record<string, ExerciseMetadata>
): number => {
    let totalFatigue = 0;

    session.blocks.forEach(block => {
        block.exercises.forEach(instance => {
            const meta = exerciseLookup[instance.exerciseId];
            const coefficient = meta ? meta.fatigueCoefficient : 1;

            instance.sets.forEach(set => {
                totalFatigue += calculateExerciseFatigue(set.rpe, set.reps, set.load, coefficient);
            });
        });
    });

    return totalFatigue;
};
