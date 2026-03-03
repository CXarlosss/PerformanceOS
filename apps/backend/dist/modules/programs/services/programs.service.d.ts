import { PrismaService } from "../../../prisma/prisma.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        templateId: string;
        athleteId: string;
        startDate: Date;
        updatedAt: Date;
    }>;
    getCurrentProgram(userId: string): Promise<({
        microcycles: ({
            sessions: ({
                blocks: ({
                    exercises: ({
                        exercise: {
                            name: string;
                            id: string;
                            createdAt: Date;
                            category: string | null;
                            muscleGroup: string | null;
                            isCompound: boolean;
                        };
                    } & {
                        id: string;
                        blockId: string;
                        exerciseId: string;
                        targetSets: number;
                        targetReps: number;
                        targetRpe: number;
                    })[];
                } & {
                    id: string;
                    order: number;
                    sessionId: string;
                    type: string;
                })[];
            } & {
                id: string;
                microcycleId: string;
                dayNumber: number;
                order: number;
                title: string;
            })[];
        } & {
            id: string;
            assignedProgramId: string;
            order: number;
            weekNumber: number;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        templateId: string;
        athleteId: string;
        startDate: Date;
        updatedAt: Date;
    }) | null>;
    updateAssignedExercise(exerciseId: string, dto: UpdateAssignedExerciseDto, coachUserId: string): Promise<{
        id: string;
        blockId: string;
        exerciseId: string;
        targetSets: number;
        targetReps: number;
        targetRpe: number;
    }>;
}
