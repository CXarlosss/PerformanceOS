import { AthleteLevel } from "@prisma/client";
export declare class CreateAthleteDto {
    name: string;
    email: string;
    password: string;
    level: AthleteLevel;
}
