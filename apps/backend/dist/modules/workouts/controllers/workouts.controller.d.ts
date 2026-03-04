import { WorkoutsService } from "../services/workouts.service";
import { MetricsService } from "../../metrics/services/metrics.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
export declare class WorkoutsController {
    private workoutsService;
    private metricsService;
    constructor(workoutsService: WorkoutsService, metricsService: MetricsService);
    registerSet(sessionId: string, dto: CreateWorkoutSetDto, req: any): Promise<{
        set: {
            id: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            createdAt: Date;
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
                    exerciseId: string;
                    targetSets: number;
                    targetReps: number;
                    targetRpe: number;
                }[];
            } & {
                id: string;
                order: number;
                sessionId: string;
                type: import(".prisma/client").$Enums.BlockType;
            })[];
        } & {
            id: string;
            microcycleId: string;
            dayNumber: number;
            order: number;
            title: string;
        };
        sets: {
            id: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            createdAt: Date;
            workoutSessionId: string;
            assignedExerciseId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        assignedProgramId: string;
        assignedSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
        sessionVolume: number | null;
        sessionFatigue: number | null;
        sessionScore: number | null;
        overloadFlag: boolean | null;
        acwr: number | null;
        riskLevel: string | null;
        fatigueModelVersion: number | null;
        completedAt: Date | null;
    })[]>;
    completeWorkout(id: string): Promise<{
        id: string;
        createdAt: Date;
        assignedProgramId: string;
        assignedSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
        sessionVolume: number | null;
        sessionFatigue: number | null;
        sessionScore: number | null;
        overloadFlag: boolean | null;
        acwr: number | null;
        riskLevel: string | null;
        fatigueModelVersion: number | null;
        completedAt: Date | null;
    }>;
}
