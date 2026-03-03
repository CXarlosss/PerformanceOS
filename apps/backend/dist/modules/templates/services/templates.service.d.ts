import { PrismaService } from "src/prisma/prisma.service";
import { CreateTemplateDto } from "../dto/create-template.dto";
export declare class TemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTemplateDto, userId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
    getAll(): Promise<({
        _count: {
            assignments: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    })[]>;
    findAll(): Promise<({
        microcycles: ({
            sessions: ({
                blocks: ({
                    exercises: ({
                        exercise: {
                            id: string;
                            name: string;
                            createdAt: Date;
                            category: string | null;
                            muscleGroup: string | null;
                            isCompound: boolean;
                        };
                    } & {
                        id: string;
                        order: number;
                        targetSets: number;
                        targetReps: number;
                        targetRpe: number;
                        exerciseId: string;
                        blockId: string;
                    })[];
                } & {
                    id: string;
                    order: number;
                    type: string;
                    sessionId: string;
                })[];
            } & {
                id: string;
                order: number;
                dayNumber: number;
                title: string;
                microcycleId: string;
            })[];
        } & {
            id: string;
            weekNumber: number;
            order: number;
            templateId: string;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    })[]>;
    findOne(id: string): Promise<{
        microcycles: ({
            sessions: ({
                blocks: ({
                    exercises: ({
                        exercise: {
                            id: string;
                            name: string;
                            createdAt: Date;
                            category: string | null;
                            muscleGroup: string | null;
                            isCompound: boolean;
                        };
                    } & {
                        id: string;
                        order: number;
                        targetSets: number;
                        targetReps: number;
                        targetRpe: number;
                        exerciseId: string;
                        blockId: string;
                    })[];
                } & {
                    id: string;
                    order: number;
                    type: string;
                    sessionId: string;
                })[];
            } & {
                id: string;
                order: number;
                dayNumber: number;
                title: string;
                microcycleId: string;
            })[];
        } & {
            id: string;
            weekNumber: number;
            order: number;
            templateId: string;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
}
