import { WorkoutsService } from '../services/workouts.service';
import { CreateWorkoutSetDto } from '../dto/create-workout-set.dto';
export declare class WorkoutsController {
    private workoutsService;
    constructor(workoutsService: WorkoutsService);
    postSet(dto: CreateWorkoutSetDto): Promise<{
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
    getMyWorkouts(req: any): Promise<({
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
