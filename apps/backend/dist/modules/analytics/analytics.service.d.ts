import { PrismaService } from "../../prisma/prisma.service";
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAthleteDashboard(athleteId: string): Promise<{
        weeklyVolume: {
            weekStart: string;
            total: number;
        }[];
        weeklyFatigue: {
            weekStart: string;
            total: number;
        }[];
        acwr: any;
        riskLevel: any;
        avgPerformanceScore: number;
        recentPRs: {
            exerciseName: any;
            load: any;
            reps: any;
            date: any;
        }[];
    }>;
    getCoachDashboard(coachId: string): Promise<{
        id: any;
        name: any;
        level: any;
        lastWorkout: any;
        acwr: any;
        riskLevel: any;
        avgScore7d: number;
        unreadInsightsCount: any;
        highestSeverity: any;
    }[]>;
}
