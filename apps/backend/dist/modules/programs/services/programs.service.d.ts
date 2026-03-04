import { PrismaService } from "../../../prisma/prisma.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
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
                            id: string;
                            createdAt: Date;
                            name: string;
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
                    type: import(".prisma/client").$Enums.BlockType;
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
        createdAt: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
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
