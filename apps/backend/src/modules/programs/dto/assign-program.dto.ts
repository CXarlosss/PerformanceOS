import { IsString } from 'class-validator';

export class AssignProgramDto {
  @IsString()
  templateId!: string;

  @IsString()
  athleteId!: string;

  @IsString()
  startDate!: string;
}