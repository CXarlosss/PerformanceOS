import { PrismaService } from "../../../prisma/prisma.service";
export declare class AthletesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        coach: {
            id: string;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        } | null;
        assignedPrograms: {
            id: string;
            status: import(".prisma/client").$Enums.ProgramStatus;
            templateId: string;
            athleteId: string;
            startDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        level: string;
        coachId: string | null;
    }>;
}
