import { InsightRule, AnalyticsData, InsightResult } from "./insight-rule.interface";
export declare class PlateauRule implements InsightRule {
    evaluate(data: AnalyticsData): InsightResult | null;
}
