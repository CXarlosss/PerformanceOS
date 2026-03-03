import { TemplatesService } from '../services/templates.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
export declare class TemplatesController {
    private templatesService;
    constructor(templatesService: TemplatesService);
    create(dto: CreateTemplateDto, req: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        durationWeeks: number;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
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
