"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverloadRule = void 0;
class OverloadRule {
    evaluate(data) {
        if (data.sessionVolume > data.avgVolumeLast4Weeks * 1.25) {
            return {
                type: "OVERLOAD",
                severity: "MEDIUM",
                title: "Sobrecarga Significativa",
                message: "Has realizado un volumen un 25% superior a tu promedio habitual. Asegúrate de priorizar la recuperación hoy.",
            };
        }
        return null;
    }
}
exports.OverloadRule = OverloadRule;
//# sourceMappingURL=overload.rule.js.map