"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSessionFatigue = exports.calculateExerciseFatigue = exports.calculateInternalLoad = void 0;
const calculateInternalLoad = (rpe, reps, load) => {
    return rpe * reps * load;
};
exports.calculateInternalLoad = calculateInternalLoad;
const calculateExerciseFatigue = (rpe, reps, load, coefficient) => {
    return (0, exports.calculateInternalLoad)(rpe, reps, load) * (coefficient / 10);
};
exports.calculateExerciseFatigue = calculateExerciseFatigue;
const calculateSessionFatigue = (session, exerciseLookup) => {
    let totalFatigue = 0;
    session.blocks.forEach(block => {
        block.exercises.forEach(instance => {
            const meta = exerciseLookup[instance.exerciseId];
            const coefficient = meta ? meta.fatigueCoefficient : 1;
            instance.sets.forEach(set => {
                totalFatigue += (0, exports.calculateExerciseFatigue)(set.rpe, set.reps, set.load, coefficient);
            });
        });
    });
    return totalFatigue;
};
exports.calculateSessionFatigue = calculateSessionFatigue;
//# sourceMappingURL=fatigue.engine.js.map