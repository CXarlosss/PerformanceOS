import { InsightsService } from "./insights.service";
export declare class InsightsController {
    private insightsService;
    constructor(insightsService: InsightsService);
    getActiveInsights(athleteId: string): Promise<any>;
    markAsRead(id: string): Promise<any>;
    triggerGeneration(athleteId: string): Promise<any[]>;
}
