import { ProgramsService } from "../services/programs.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsController {
    private programsService;
    constructor(programsService: ProgramsService);
    getCurrent(req: any): Promise<{
        id: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        updatedAt: Date;
        templateId: string;
        athleteId: string;
    } | null>;
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.ProgramStatus;
        createdAt: Date;
        updatedAt: Date;
        templateId: string;
        athleteId: string;
    }>;
    updateAssignedExercise(id: string, dto: UpdateAssignedExerciseDto, req: any): Promise<{
        id: string;
        blockId: string;
        exerciseId: string;
        targetSets: number;
        targetReps: number;
        targetRpe: number;
    }>;
}
