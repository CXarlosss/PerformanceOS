"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlateauRule = void 0;
class PlateauRule {
    evaluate(data) {
        if (data.volumeVariance < 0.05 &&
            data.scoreVariance < 0.03 &&
            data.prCountLast4Weeks === 0 &&
            data.acwr >= 0.8 &&
            data.acwr <= 1.3) {
            return {
                type: "PLATEAU",
                severity: "MEDIUM",
                title: "Estancamiento Detectado",
                message: "Tu rendimiento se ha mantenido plano en las últimas 4 semanas. Considera variar la intensidad o el volumen para romper el plateau.",
            };
        }
        return null;
    }
}
exports.PlateauRule = PlateauRule;
//# sourceMappingURL=plateau.rule.js.map