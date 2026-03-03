import { InsightRule, AnalyticsData, InsightResult } from "./insight-rule.interface";
export declare class ProgressionRule implements InsightRule {
    evaluate(data: AnalyticsData): InsightResult | null;
}
