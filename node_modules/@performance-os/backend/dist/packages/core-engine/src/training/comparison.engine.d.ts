import type { Microcycle } from '../types/training.types';
export type ComparisonResult = {
    volumeDelta: number;
    intensityDelta: number;
    overloadRisk: boolean;
};
export declare const calculateVolumeDelta: (currentVolume: number, prevVolume: number) => number;
export declare const compareMicrocycles: (current: Microcycle, previous: Microcycle, volumeAlerts: {
    low: number;
    high: number;
}) => ComparisonResult;
