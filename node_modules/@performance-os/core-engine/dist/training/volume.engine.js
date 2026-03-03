"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMicrocycleVolume = exports.calculateSessionVolume = exports.calculateBlockVolume = exports.calculateExerciseVolume = exports.calculateSetVolume = void 0;
const calculateSetVolume = (set) => set.reps * set.load;
exports.calculateSetVolume = calculateSetVolume;
const calculateExerciseVolume = (exercise) => exercise.sets.reduce((acc, set) => acc + (0, exports.calculateSetVolume)(set), 0);
exports.calculateExerciseVolume = calculateExerciseVolume;
const calculateBlockVolume = (block) => block.exercises.reduce((acc, exercise) => acc + (0, exports.calculateExerciseVolume)(exercise), 0);
exports.calculateBlockVolume = calculateBlockVolume;
const calculateSessionVolume = (session) => session.blocks.reduce((acc, block) => acc + (0, exports.calculateBlockVolume)(block), 0);
exports.calculateSessionVolume = calculateSessionVolume;
const calculateMicrocycleVolume = (microcycle) => microcycle.sessions.reduce((acc, session) => acc + (0, exports.calculateSessionVolume)(session), 0);
exports.calculateMicrocycleVolume = calculateMicrocycleVolume;
//# sourceMappingURL=volume.engine.js.map