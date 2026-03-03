import { PrismaService } from '../../../prisma/prisma.service';
import { CreateWorkoutSetDto } from '../dto/create-workout-set.dto';
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    createWorkoutSet(dto: CreateWorkoutSetDto): Promise<{
        set: {
            id: string;
            exerciseName: string;
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
    private getAthleteIdBySession;
    private mapToEngineSession;
    getSessionsForAthlete(userId: string): Promise<({
        templateSession: {
            id: string;
            microcycleId: string;
            dayNumber: number;
            title: string;
        };
        sets: {
            id: string;
            exerciseName: string;
            setNumber: number;
            reps: number;
            load: number;
            rpe: number;
            isPR: boolean;
            workoutSessionId: string;
        }[];
    } & {
        id: string;
        assignedProgramId: string;
        templateSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
    })[]>;
}
