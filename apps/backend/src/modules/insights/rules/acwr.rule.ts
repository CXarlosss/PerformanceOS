import {
  InsightRule,
  AnalyticsData,
  InsightResult,
} from "./insight-rule.interface";

export class AcwrRule implements InsightRule {
  evaluate(data: AnalyticsData): InsightResult | null {
    if (data.acwr > 1.5) {
      return {
        type: "RISK",
        severity: "HIGH",
        title: "Riesgo de Lesión Crítico",
        message:
          "Tu carga aguda es significativamente mayor a tu base crónica (ACWR > 1.5). El riesgo de lesión es alto. Considera una semana de descarga.",
      };
    }

    if (data.acwr < 0.8) {
      return {
        type: "UNDERTRAINING",
        severity: "LOW",
        title: "Infraestimulación",
        message:
          "Tu carga actual está por debajo de tu capacidad. Podrías aumentar ligeramente la intensidad para seguir progresando.",
      };
    }

    return null;
  }
}
