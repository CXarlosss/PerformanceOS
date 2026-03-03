import { PrismaService } from "../../prisma/prisma.service";
export declare class InsightsService {
    private prisma;
    private rules;
    constructor(prisma: PrismaService);
    getActiveInsights(athleteId: string): Promise<any>;
    markAsRead(insightId: string): Promise<any>;
    generateInsights(athleteId: string, currentSessionId?: string): Promise<any[]>;
    private collectAnalyticsData;
}
