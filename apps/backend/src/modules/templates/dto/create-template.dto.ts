import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
  IsUUID,
  IsEnum,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { BlockType } from "@prisma/client";

class TemplateExerciseDto {
  @IsUUID()
  exerciseId!: string;

  @IsInt()
  @Min(1)
  targetSets!: number;

  @IsInt()
  @Min(1)
  targetReps!: number;

  @IsInt()
  @Min(0)
  @Max(10)
  targetRpe!: number;
}

class TemplateBlockDto {
  @IsEnum(BlockType)
  type!: BlockType; // STRENGTH, HYPERTROPHY, POWER, ENDURANCE, ACCESSORY

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateExerciseDto)
  exercises!: TemplateExerciseDto[];
}

class TemplateSessionDto {
  @IsString()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateBlockDto)
  blocks!: TemplateBlockDto[];
}

class TemplateMicrocycleDto {
  @IsInt()
  weekNumber!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateSessionDto)
  sessions!: TemplateSessionDto[];
}

export class CreateTemplateDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsInt()
  @Min(1)
  durationWeeks!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateMicrocycleDto)
  microcycles!: TemplateMicrocycleDto[];
}
