import { AthletesService } from "../services/athletes.service";
export declare class AthletesController {
    private athletesService;
    constructor(athletesService: AthletesService);
    findAll(): Promise<({
        coach: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
        } | null;
        assignedPrograms: {
            id: string;
            status: import(".prisma/client").$Enums.ProgramStatus;
            createdAt: Date;
            templateId: string;
            athleteId: string;
            startDate: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        level: string;
        coachId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        assignedPrograms: ({
            microcycles: ({
                sessions: ({
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
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        level: string;
        coachId: string | null;
    }>;
}
