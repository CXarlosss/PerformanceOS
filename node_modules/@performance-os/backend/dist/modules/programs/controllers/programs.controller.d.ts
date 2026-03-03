import { ProgramsService } from "../services/programs.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";
export declare class ProgramsController {
    private programsService;
    constructor(programsService: ProgramsService);
    getCurrent(req: any): Promise<({
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
    assign(dto: AssignProgramDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProgramStatus;
        templateId: string;
        athleteId: string;
        startDate: Date;
    }>;
    updateAssignedExercise(id: string, dto: UpdateAssignedExerciseDto, req: any): Promise<{
        id: string;
        blockId: string;
        exerciseName: string;
        targetSets: number;
        targetReps: number;
        targetRpe: number;
    }>;
}
