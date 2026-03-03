"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageIntensityPerSession = exports.calculateRelativeIntensity = exports.estimate1RM = void 0;
const volume_engine_1 = require("./volume.engine");
const estimate1RM = (load, reps) => {
    if (reps === 1)
        return load;
    return load * (1 + reps / 30);
};
exports.estimate1RM = estimate1RM;
const calculateRelativeIntensity = (load, estimated1RM) => {
    if (estimated1RM === 0)
        return 0;
    return load / estimated1RM;
};
exports.calculateRelativeIntensity = calculateRelativeIntensity;
const calculateAverageIntensityPerSession = (session) => {
    let totalVolume = 0;
    session.blocks.forEach(block => {
        block.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setVolume = (0, volume_engine_1.calculateSetVolume)(set);
                totalVolume += setVolume;
            });
        });
    });
    if (totalVolume === 0)
        return 0;
    const allSets = session.blocks.flatMap(b => b.exercises.flatMap(e => e.sets));
    if (allSets.length === 0)
        return 0;
    return allSets.reduce((acc, set) => acc + set.load, 0) / allSets.length;
};
exports.calculateAverageIntensityPerSession = calculateAverageIntensityPerSession;
//# sourceMappingURL=intensity.engine.js.map