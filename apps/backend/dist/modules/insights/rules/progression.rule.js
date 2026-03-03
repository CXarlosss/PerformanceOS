"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressionRule = void 0;
class ProgressionRule {
    evaluate(data) {
        if (data.sessionScore > 90 && data.prCountLast4Weeks > 0) {
            return {
                type: "PROGRESSION",
                severity: "LOW",
                title: "Progresión Excelente",
                message: "¡Buen trabajo! Estás batiendo récords con un score de rendimiento muy alto. Mantén la consistencia.",
            };
        }
        return null;
    }
}
exports.ProgressionRule = ProgressionRule;
//# sourceMappingURL=progression.rule.js.map