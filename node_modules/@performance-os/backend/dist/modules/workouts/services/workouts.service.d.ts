import { PrismaService } from "../../../prisma/prisma.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    registerSet(sessionId: string, dto: CreateWorkoutSetDto, athleteUserId: string): Promise<{
        set: {
            id: string;
            workoutSessionId: string;
            assignedExerciseId: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
        };
        isPR: boolean;
        realtimeMetrics: {
            sessionVolume: number;
            sessionFatigue: number;
        };
    }>;
    getSessionsForAthlete(userId: string): Promise<({
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
            workoutSessionId: string;
            assignedExerciseId: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
        }[];
    } & {
        id: string;
        assignedProgramId: string;
        assignedSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
    })[]>;
}
