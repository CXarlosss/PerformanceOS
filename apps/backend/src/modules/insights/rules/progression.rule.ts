import {
  InsightRule,
  AnalyticsData,
  InsightResult,
} from "./insight-rule.interface";

export class ProgressionRule implements InsightRule {
  evaluate(data: AnalyticsData): InsightResult | null {
    if (data.sessionScore > 90 && data.prCountLast4Weeks > 0) {
      return {
        type: "PROGRESSION",
        severity: "LOW",
        title: "Progresión Excelente",
        message:
          "¡Buen trabajo! Estás batiendo récords con un score de rendimiento muy alto. Mantén la consistencia.",
      };
    }

    return null;
  }
}
