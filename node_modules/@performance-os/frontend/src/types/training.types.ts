export interface WorkoutSet {
    id: string
    exerciseName: string
    reps: number
    load: number
    rpe: number
}

export interface WorkoutSession {
    id: string
    templateSessionId: string
    sets: WorkoutSet[]
}

export interface ExerciseTemplate {
    id: string
    name: string
    targetSets: number
    targetReps: number
    targetRpe: number
}

export interface BlockTemplate {
    id: string
    exercises: ExerciseTemplate[]
}

export interface SessionTemplate {
    id: string
    blocks: BlockTemplate[]
}

export interface MicrocycleTemplate {
    id: string
    sessions: SessionTemplate[]
}

export interface Program {
    template: {
        microcycles: MicrocycleTemplate[]
    }
    workoutSessions: WorkoutSession[]
}