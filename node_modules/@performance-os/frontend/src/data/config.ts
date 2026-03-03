export type SystemConfig = {
    rpe: {
        min: number;
        max: number;
    };
    prThreshold: number;
    comparisonWindowWeeks: number;
    fatigueDefault: number;
    volumeAlerts: {
        low: number;
        high: number;
    };
};

export const systemConfig: SystemConfig = {
    rpe: { min: 6, max: 10 },
    prThreshold: 0.005, // 0.5%
    comparisonWindowWeeks: 4,
    fatigueDefault: 1,
    volumeAlerts: {
        low: -0.08, // -8%
        high: 0.15, // +15%
    },
};

// Aliases for retro-compatibility
export const T_Config_Global = systemConfig;
