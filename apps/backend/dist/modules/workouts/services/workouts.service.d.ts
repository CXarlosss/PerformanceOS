import { PrismaService } from "../../../prisma/prisma.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    registerSet(sessionId: string, dto: CreateWorkoutSetDto, athleteUserId: string): Promise<{
        set: {
            id: string;
            createdAt: Date;
            assignedExerciseId: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            workoutSessionId: string;
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
                    exerciseId: string;
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
            order: number;
            microcycleId: string;
            dayNumber: number;
            title: string;
        };
        sets: {
            id: string;
            createdAt: Date;
            assignedExerciseId: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            workoutSessionId: string;
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
}
