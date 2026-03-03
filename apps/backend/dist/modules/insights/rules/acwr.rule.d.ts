import { InsightRule, AnalyticsData, InsightResult } from "./insight-rule.interface";
export declare class AcwrRule implements InsightRule {
    evaluate(data: AnalyticsData): InsightResult | null;
}
