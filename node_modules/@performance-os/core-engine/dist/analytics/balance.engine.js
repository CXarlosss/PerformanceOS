"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectMuscleImbalance = exports.calculatePushPullRatio = exports.calculateVolumeByMuscleGroup = void 0;
const volume_engine_1 = require("../training/volume.engine");
const calculateVolumeByMuscleGroup = (session, exerciseLookup) => {
    const volumes = {};
    session.blocks.forEach(block => {
        block.exercises.forEach(instance => {
            const meta = exerciseLookup[instance.exerciseId];
            const category = meta ? meta.category : 'Otros';
            const volume = (0, volume_engine_1.calculateExerciseVolume)(instance);
            volumes[category] = (volumes[category] || 0) + volume;
        });
    });
    return volumes;
};
exports.calculateVolumeByMuscleGroup = calculateVolumeByMuscleGroup;
const calculatePushPullRatio = (volumes) => {
    const push = volumes['Empuje'] || 0;
    const pull = volumes['Tracción'] || 0;
    if (pull === 0)
        return push > 0 ? 100 : 1;
    return push / pull;
};
exports.calculatePushPullRatio = calculatePushPullRatio;
const detectMuscleImbalance = (ratio) => {
    return ratio < 0.7 || ratio > 1.4;
};
exports.detectMuscleImbalance = detectMuscleImbalance;
//# sourceMappingURL=balance.engine.js.map