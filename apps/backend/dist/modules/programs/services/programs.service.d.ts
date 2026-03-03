import { PrismaService } from "../../../prisma/prisma.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        updatedAt: Date;
        templateId: string;
        athleteId: string;
    }>;
    getCurrentProgram(userId: string): Promise<{
        id: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        updatedAt: Date;
        templateId: string;
        athleteId: string;
    } | null>;
    updateAssignedExercise(exerciseId: string, dto: UpdateAssignedExerciseDto, coachUserId: string): Promise<{
        id: string;
        blockId: string;
        exerciseId: string;
        targetSets: number;
        targetReps: number;
        targetRpe: number;
    }>;
}
