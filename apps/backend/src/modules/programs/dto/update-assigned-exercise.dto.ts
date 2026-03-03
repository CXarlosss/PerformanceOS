import { IsOptional, IsInt, Min, Max } from "class-validator";

export class UpdateAssignedExerciseDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  targetSets?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  targetReps?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  targetRpe?: number;
}
