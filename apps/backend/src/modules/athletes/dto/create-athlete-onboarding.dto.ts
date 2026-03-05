import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  MinLength,
} from "class-validator";
import { AthleteLevel } from "@prisma/client";

export class CreateAthleteOnboardingDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(AthleteLevel)
  level: AthleteLevel;

  @IsOptional()
  @IsUUID()
  templateId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;
}
