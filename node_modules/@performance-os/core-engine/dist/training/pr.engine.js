"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareAgainstHistory = exports.detectPR = void 0;
const intensity_engine_1 = require("./intensity.engine");
const detectPR = (exercise, history, prThreshold) => {
    const currentBest1RM = exercise.sets.reduce((max, set) => {
        const e1RM = (0, intensity_engine_1.estimate1RM)(set.load, set.reps);
        return e1RM > max ? e1RM : max;
    }, 0);
    const historicalBest = history[exercise.exerciseId] || 0;
    if (historicalBest === 0)
        return true;
    return currentBest1RM > historicalBest * (1 + prThreshold);
};
exports.detectPR = detectPR;
const compareAgainstHistory = (sessionExercises, history, prThreshold) => {
    const newPRs = [];
    sessionExercises.forEach(exercise => {
        if ((0, exports.detectPR)(exercise, history, prThreshold)) {
            newPRs.push(exercise.exerciseId);
        }
    });
    return newPRs;
};
exports.compareAgainstHistory = compareAgainstHistory;
//# sourceMappingURL=pr.engine.js.map