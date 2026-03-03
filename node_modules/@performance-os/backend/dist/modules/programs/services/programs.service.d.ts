import { PrismaService } from "../../../prisma/prisma.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProgramStatus;
        templateId: string;
        athleteId: string;
        startDate: Date;
    }>;
    getCurrentProgram(userId: string): Promise<({
        microcycles: ({
            sessions: ({
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
            })[];
        } & {
            id: string;
            assignedProgramId: string;
            weekNumber: number;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ProgramStatus;
        templateId: string;
        athleteId: string;
        startDate: Date;
    }) | null>;
    updateAssignedExercise(exerciseId: string, dto: UpdateAssignedExerciseDto, coachUserId: string): Promise<{
        id: string;
        blockId: string;
        exerciseName: string;
        targetSets: number;
        targetReps: number;
        targetRpe: number;
    }>;
}
