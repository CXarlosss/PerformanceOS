"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMicrocycles = exports.calculateVolumeDelta = void 0;
const volume_engine_1 = require("./volume.engine");
const calculateVolumeDelta = (currentVolume, prevVolume) => {
    if (prevVolume === 0)
        return 0;
    return (currentVolume - prevVolume) / prevVolume;
};
exports.calculateVolumeDelta = calculateVolumeDelta;
const compareMicrocycles = (current, previous, volumeAlerts) => {
    const currentVolume = (0, volume_engine_1.calculateMicrocycleVolume)(current);
    const prevVolume = (0, volume_engine_1.calculateMicrocycleVolume)(previous);
    const delta = (0, exports.calculateVolumeDelta)(currentVolume, prevVolume);
    return {
        volumeDelta: delta,
        intensityDelta: 0,
        overloadRisk: delta > volumeAlerts.high || delta < volumeAlerts.low,
    };
};
exports.compareMicrocycles = compareMicrocycles;
//# sourceMappingURL=comparison.engine.js.map