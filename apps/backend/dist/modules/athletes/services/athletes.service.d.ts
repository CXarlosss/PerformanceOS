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
            updatedAt: Date;
        } | null;
        assignedPrograms: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProgramStatus;
            templateId: string;
            athleteId: string;
            startDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
                            exerciseId: string;
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
                    order: number;
                    microcycleId: string;
                    dayNumber: number;
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
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProgramStatus;
            templateId: string;
            athleteId: string;
            startDate: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        level: string;
        coachId: string | null;
    }>;
}
