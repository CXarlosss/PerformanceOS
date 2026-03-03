import { PrismaService } from "../../../prisma/prisma.service";
export declare class WorkloadService {
    private prisma;
    constructor(prisma: PrismaService);
    calculateAcuteLoad(tx: any, athleteId: string): Promise<number>;
    calculateChronicLoad(tx: any, athleteId: string): Promise<number>;
    calculateACWR(tx: any, athleteId: string, currentSessionFatigue: number): Promise<{
        acwr: number;
        riskLevel: string;
    }>;
}
