import { PrismaService } from "../../../prisma/prisma.service";
import { Prisma } from "@prisma/client";
export declare class WorkloadService {
    private prisma;
    constructor(prisma: PrismaService);
    calculateAcuteLoad(tx: Prisma.TransactionClient, athleteId: string): Promise<number>;
    calculateChronicLoad(tx: Prisma.TransactionClient, athleteId: string): Promise<number>;
    calculateACWR(tx: Prisma.TransactionClient, athleteId: string, currentSessionFatigue: number): Promise<{
        acwr: number;
        riskLevel: string;
    }>;
}
