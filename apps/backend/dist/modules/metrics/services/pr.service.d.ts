import { PrismaService } from "../../../prisma/prisma.service";
export declare class PRService {
    private prisma;
    constructor(prisma: PrismaService);
    private estimate1RM;
    detectPR(assignedExerciseId: string, load: number, reps: number): Promise<boolean>;
}
