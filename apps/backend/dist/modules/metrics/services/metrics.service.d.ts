import { PrismaService } from "../../../prisma/prisma.service";
import { WorkloadService } from "./workload.service";
import { InsightsService } from "../../insights/insights.service";
export declare class MetricsService {
    private prisma;
    private workloadService;
    private insightsService;
    constructor(prisma: PrismaService, workloadService: WorkloadService, insightsService: InsightsService);
    completeWorkout(workoutId: string): Promise<{
        id: string;
        createdAt: Date;
        assignedProgramId: string;
        assignedSessionId: string;
        date: Date;
        status: import(".prisma/client").$Enums.SessionStatus;
        sessionVolume: number | null;
        sessionFatigue: number | null;
        sessionScore: number | null;
        overloadFlag: boolean | null;
        acwr: number | null;
        riskLevel: string | null;
        fatigueModelVersion: number | null;
        completedAt: Date | null;
    }>;
    private estimate1RM;
    private calculateSessionMetrics;
}
