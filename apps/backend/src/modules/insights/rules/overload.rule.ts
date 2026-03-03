import {
  InsightRule,
  AnalyticsData,
  InsightResult,
} from "./insight-rule.interface";

export class OverloadRule implements InsightRule {
  evaluate(data: AnalyticsData): InsightResult | null {
    if (data.sessionVolume > data.avgVolumeLast4Weeks * 1.25) {
      return {
        type: "OVERLOAD",
        severity: "MEDIUM",
        title: "Sobrecarga Significativa",
        message:
          "Has realizado un volumen un 25% superior a tu promedio habitual. Asegúrate de priorizar la recuperación hoy.",
      };
    }

    return null;
  }
}
