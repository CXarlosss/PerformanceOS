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
        createdById: string;
    }>;
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
