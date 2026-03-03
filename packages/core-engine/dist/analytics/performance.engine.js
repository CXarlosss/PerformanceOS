"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeeklyTrend = exports.calculateTrainingDensity = exports.calculateConsistencyIndex = exports.calculateVolumeProgression = void 0;
const calculateVolumeProgression = (current, previous) => {
    if (previous === 0)
        return 0;
    return ((current - previous) / previous) * 100;
};
exports.calculateVolumeProgression = calculateVolumeProgression;
const calculateConsistencyIndex = (sessionsPlanned, sessionsCompleted) => {
    if (sessionsPlanned === 0)
        return 0;
    return (sessionsCompleted / sessionsPlanned) * 100;
};
exports.calculateConsistencyIndex = calculateConsistencyIndex;
const calculateTrainingDensity = (volume, durationMinutes) => {
    if (durationMinutes === 0)
        return 0;
    return volume / durationMinutes;
};
exports.calculateTrainingDensity = calculateTrainingDensity;
const calculateWeeklyTrend = (volumes) => {
    if (volumes.length < 2)
        return 0;
    const last = volumes[volumes.length - 1];
    const secondLast = volumes[volumes.length - 2];
    return (0, exports.calculateVolumeProgression)(last, secondLast);
};
exports.calculateWeeklyTrend = calculateWeeklyTrend;
//# sourceMappingURL=performance.engine.js.map