import { BlockType } from "@prisma/client";
declare class TemplateExerciseDto {
    exerciseId: string;
    targetSets: number;
    targetReps: number;
    targetRpe: number;
}
declare class TemplateBlockDto {
    type: BlockType;
    exercises: TemplateExerciseDto[];
}
declare class TemplateSessionDto {
    title: string;
    blocks: TemplateBlockDto[];
}
declare class TemplateMicrocycleDto {
    weekNumber: number;
    sessions: TemplateSessionDto[];
}
export declare class CreateTemplateDto {
    title: string;
    description: string;
    durationWeeks: number;
    microcycles: TemplateMicrocycleDto[];
}
export {};
