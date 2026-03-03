"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePerformanceScore = void 0;
const calculatePerformanceScore = (progression, consistency, fatigueFactor, intensityAlignment) => {
    const p = Math.max(0, Math.min(1.5, progression));
    const c = Math.max(0, Math.min(1, consistency));
    const f = Math.max(0, Math.min(1, fatigueFactor));
    const i = Math.max(0, Math.min(1, intensityAlignment));
    const total = (p * 0.4 + c * 0.25 + f * 0.2 + i * 0.15) * 100;
    const roundedTotal = Math.round(Math.min(100, total));
    let interpretation = "Excelente progresión con control adecuado de fatiga.";
    if (roundedTotal < 50)
        interpretation = "Se requiere mayor consistencia para ver resultados.";
    else if (roundedTotal < 75)
        interpretation = "Buen trabajo, busca optimizar la recuperación.";
    return {
        totalScore: roundedTotal,
        progressionScore: Math.round(p * 100),
        consistencyScore: Math.round(c * 100),
        fatigueManagementScore: Math.round(f * 100),
        intensityAlignmentScore: Math.round(i * 100),
        interpretation,
    };
};
exports.calculatePerformanceScore = calculatePerformanceScore;
//# sourceMappingURL=scoring.engine.js.map