export type PerformanceScore = {
    totalScore: number;
    progressionScore: number;
    consistencyScore: number;
    fatigueManagementScore: number;
    intensityAlignmentScore: number;
    interpretation: string;
};

export const calculatePerformanceScore = (
    progression: number, // 0-1 (100% is 1)
    consistency: number, // 0-1
    fatigueFactor: number, // 0-1 (higher is better managed)
    intensityAlignment: number // 0-1
): PerformanceScore => {
    // Normalize inputs to 0-1 range roughly if they are percentages
    const p = Math.max(0, Math.min(1.5, progression)); // Cap at 150% progression for scoring
    const c = Math.max(0, Math.min(1, consistency));
    const f = Math.max(0, Math.min(1, fatigueFactor));
    const i = Math.max(0, Math.min(1, intensityAlignment));

    // Weights
    const total = (p * 0.4 + c * 0.25 + f * 0.2 + i * 0.15) * 100;
    const roundedTotal = Math.round(Math.min(100, total));

    let interpretation = "Excelente progresión con control adecuado de fatiga.";
    if (roundedTotal < 50) interpretation = "Se requiere mayor consistencia para ver resultados.";
    else if (roundedTotal < 75) interpretation = "Buen trabajo, busca optimizar la recuperación.";

    return {
        totalScore: roundedTotal,
        progressionScore: Math.round(p * 100),
        consistencyScore: Math.round(c * 100),
        fatigueManagementScore: Math.round(f * 100),
        intensityAlignmentScore: Math.round(i * 100),
        interpretation,
    };
};
