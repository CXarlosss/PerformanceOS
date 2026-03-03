export type Set = {
    id: string;
    reps: number;
    load: number;
    rpe: number;
};

export type ExerciseInstance = {
    id: string;
    exerciseId: string;
    sets: Set[];
};

export type BlockType = 'ACTIVATION' | 'STRENGTH' | 'ACCESSORY';

export type Block = {
    id: string;
    type: BlockType;
    exercises: ExerciseInstance[];
};

export type Session = {
    id: string;
    date: string;
    microcycleId: string;
    name: string;
    blocks: Block[];
};

export type Microcycle = {
    id: string;
    startDate: string;
    endDate: string;
    sessions: Session[];
};

export type ExerciseMetadata = {
    id: string;
    name: string;
    category: string;
    fatigueCoefficient: number;
};
