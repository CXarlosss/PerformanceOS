import { WorkoutsService } from "../services/workouts.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
export declare class WorkoutsController {
    private workoutsService;
    constructor(workoutsService: WorkoutsService);
    registerSet(sessionId: string, dto: CreateWorkoutSetDto, req: any): Promise<{
        set: {
            id: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            workoutSessionId: string;
            assignedExerciseId: string;
        };
        isPR: boolean;
        realtimeMetrics: {
            sessionVolume: number;
            sessionFatigue: number;
        };
    }>;
    getMyWorkouts(req: any): Promise<({
        assignedSession: {
            blocks: ({
                exercises: {
                    id: string;
                    blockId: string;
                    exerciseName: string;
                    targetSets: number;
                    targetReps: number;
                    targetRpe: number;
                }[];
            } & {
                id: string;
                sessionId: string;
                type: string;
                order: number;
            })[];
        } & {
            id: string;
            microcycleId: string;
            dayNumber: number;
            title: string;
        };
        sets: {
            id: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            workoutSessionId: string;
            assignedExerciseId: string;
        }[];
    } & {
        id: string;
        assignedProgramId: string;
        assignedSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
    })[]>;
}
