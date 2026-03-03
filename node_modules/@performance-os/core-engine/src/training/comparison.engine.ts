import type { Microcycle } from '../types/training.types';
import { calculateMicrocycleVolume } from './volume.engine';

export type ComparisonResult = {
    volumeDelta: number;
    intensityDelta: number;
    overloadRisk: boolean;
};

export const calculateVolumeDelta = (currentVolume: number, prevVolume: number): number => {
    if (prevVolume === 0) return 0;
    return (currentVolume - prevVolume) / prevVolume;
};

export const compareMicrocycles = (
    current: Microcycle,
    previous: Microcycle,
    volumeAlerts: { low: number; high: number }
): ComparisonResult => {
    const currentVolume = calculateMicrocycleVolume(current);
    const prevVolume = calculateMicrocycleVolume(previous);

    const delta = calculateVolumeDelta(currentVolume, prevVolume);

    return {
        volumeDelta: delta,
        intensityDelta: 0,
        overloadRisk: delta > volumeAlerts.high || delta < volumeAlerts.low,
    };
};
