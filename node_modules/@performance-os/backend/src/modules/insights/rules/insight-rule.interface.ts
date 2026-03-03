export type InsightType =
  | "OVERLOAD"
  | "UNDERTRAINING"
  | "PLATEAU"
  | "PROGRESSION"
  | "RISK";
export type InsightSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface InsightResult {
  type: InsightType;
  severity: InsightSeverity;
  title: string;
  message: string;
}

export interface AnalyticsData {
  athleteId: string;
  acwr: number;
  sessionVolume: number;
  sessionFatigue: number;
  sessionScore: number;
  avgScoreLast4Weeks: number;
  avgVolumeLast4Weeks: number;
  volumeVariance: number;
  scoreVariance: number;
  prCountLast4Weeks: number;
  fatigueTrend: "increasing" | "decreasing" | "stable";
}

export interface InsightRule {
  evaluate(data: AnalyticsData): InsightResult | null;
}
