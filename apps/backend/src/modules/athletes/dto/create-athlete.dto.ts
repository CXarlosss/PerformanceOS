import { IsString, IsEmail, MinLength, IsEnum } from "class-validator";
import { AthleteLevel } from "@prisma/client";

export class CreateAthleteDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(AthleteLevel)
  level!: AthleteLevel; // BEGINNER, INTERMEDIATE, ADVANCED
}
