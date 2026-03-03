export * from './volume.engine';
export * from './intensity.engine';
export * from './fatigue.engine';
export * from './pr.engine';
export * from './comparison.engine';

// Explicit re-exports for HMR stability
export type { ConsolidatedMetrics, SessionMetrics, MicrocycleMetrics } from '../types/metrics.types';
export * from '../types/metrics.types';
export * from '../types/training.types';
