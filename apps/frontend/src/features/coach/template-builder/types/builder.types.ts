export interface BuilderExercise {
    id: string;
    name: string;
    targetSets: number;
    targetReps: number;
    targetRpe: number;
}
export interface BuilderBlock {
    id: string;
    type: string;
    exercises: BuilderExercise[];
}
export interface BuilderSession {
    id: string;
    title: string;
    blocks: BuilderBlock[];
}
export interface BuilderMicrocycle {
    id: string;
    name: string;
    order: number;
    sessions: BuilderSession[];
}
export interface BuilderTemplate {
    title: string;
    description: string;
    durationWeeks: number;
    microcycles: BuilderMicrocycle[];
}