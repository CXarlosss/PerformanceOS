import { IsInt, IsNumber, IsBoolean, IsUUID, Min, Max } from "class-validator";

export class CreateWorkoutSetDto {
  @IsUUID()
  assignedExerciseId!: string;

  @IsInt()
  @Min(1)
  setNumber!: number;

  @IsInt()
  @Min(1)
  reps!: number;

  @IsNumber()
  @Min(0)
  load!: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rpe!: number;

  @IsBoolean()
  isPR!: boolean;
}
