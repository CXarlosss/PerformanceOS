import { PrismaService } from "../../../prisma/prisma.service";
import { CreateAthleteDto } from "../dto/create-athlete.dto";
export declare class AthletesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAthleteDto, coachId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        level: import(".prisma/client").$Enums.AthleteLevel;
        coachId: string | null;
    }>;
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
            createdAt: Date;
            status: import(".prisma/client").$Enums.ProgramStatus;
            templateId: string;
            athleteId: string;
            startDate: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        level: import(".prisma/client").$Enums.AthleteLevel;
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        level: import(".prisma/client").$Enums.AthleteLevel;
        coachId: string | null;
    }>;
}
