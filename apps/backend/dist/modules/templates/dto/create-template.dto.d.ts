declare class TemplateExerciseDto {
    name: string;
    targetSets: number;
    targetReps: number;
    targetRpe: number;
}
declare class TemplateBlockDto {
    type: string;
    exercises: TemplateExerciseDto[];
}
declare class TemplateSessionDto {
    title: string;
    blocks: TemplateBlockDto[];
}
declare class TemplateMicrocycleDto {
    name: string;
    order: number;
    sessions: TemplateSessionDto[];
}
export declare class CreateTemplateDto {
    title: string;
    description: string;
    durationWeeks: number;
    microcycles: TemplateMicrocycleDto[];
}
export {};
