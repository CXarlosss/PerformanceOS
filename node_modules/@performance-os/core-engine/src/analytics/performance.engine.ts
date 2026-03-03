export const calculateVolumeProgression = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

export const calculateConsistencyIndex = (
    sessionsPlanned: number,
    sessionsCompleted: number
): number => {
    if (sessionsPlanned === 0) return 0;
    return (sessionsCompleted / sessionsPlanned) * 100;
};

export const calculateTrainingDensity = (
    volume: number,
    durationMinutes: number
): number => {
    if (durationMinutes === 0) return 0;
    return volume / durationMinutes;
};

export const calculateWeeklyTrend = (volumes: number[]): number => {
    if (volumes.length < 2) return 0;
    const last = volumes[volumes.length - 1];
    const secondLast = volumes[volumes.length - 2];
    return calculateVolumeProgression(last, secondLast);
};
