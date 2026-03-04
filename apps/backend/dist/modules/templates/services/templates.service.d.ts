import { PrismaService } from "../../../prisma/prisma.service";
import { CreateTemplateDto } from "../dto/create-template.dto";
export declare class TemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTemplateDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    }>;
    getAll(): Promise<({
        _count: {
            assignments: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    })[]>;
    findAll(): Promise<({
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
                        order: number;
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
            templateId: string;
            order: number;
            weekNumber: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    })[]>;
    findOne(id: string): Promise<{
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
                        order: number;
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
            templateId: string;
            order: number;
            weekNumber: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    }>;
}
