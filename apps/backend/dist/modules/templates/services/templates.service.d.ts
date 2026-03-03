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
        createdById: string;
    })[]>;
    findAll(): Promise<({
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
            templateId: string;
            weekNumber: number;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    })[]>;
    findOne(id: string): Promise<{
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
            templateId: string;
            weekNumber: number;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    }>;
}
