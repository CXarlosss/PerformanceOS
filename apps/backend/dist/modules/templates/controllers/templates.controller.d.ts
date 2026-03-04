import { TemplatesService } from '../services/templates.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
export declare class TemplatesController {
    private templatesService;
    constructor(templatesService: TemplatesService);
    create(dto: CreateTemplateDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdById: string;
    }>;
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
