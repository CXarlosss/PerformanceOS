import type { Set, ExerciseInstance, Block, Session, Microcycle } from '../types/training.types';

export const calculateSetVolume = (set: Set): number => set.reps * set.load;

export const calculateExerciseVolume = (exercise: ExerciseInstance): number =>
    exercise.sets.reduce((acc, set) => acc + calculateSetVolume(set), 0);

export const calculateBlockVolume = (block: Block): number =>
    block.exercises.reduce((acc, exercise) => acc + calculateExerciseVolume(exercise), 0);

export const calculateSessionVolume = (session: Session): number =>
    session.blocks.reduce((acc, block) => acc + calculateBlockVolume(block), 0);

export const calculateMicrocycleVolume = (microcycle: Microcycle): number =>
    microcycle.sessions.reduce((acc, session) => acc + calculateSessionVolume(session), 0);
