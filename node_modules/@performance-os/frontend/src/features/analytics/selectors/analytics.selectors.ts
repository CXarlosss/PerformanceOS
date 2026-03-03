import { Microcycle } from '../../../core/types/training.types';
import { calculateMicrocycleVolume } from '../../../core/training';

export const selectCurrentMicrocycleMetrics = (microcycle: Microcycle | null) => {
    if (!microcycle) return null;
    return {
        volume: calculateMicrocycleVolume(microcycle),
        sessionCount: microcycle.sessions.length,
    };
};

export const selectHistoricalTrend = (history: Microcycle[]) => {
    return history.map(m => ({
        id: m.id,
        volume: calculateMicrocycleVolume(m),
        label: `${m.startDate.slice(5)}`,
    }));
};

export const selectTopPRs = (history: Microcycle[], exerciseId: string) => {
    // This would be a more complex reduce in production
    return history.flatMap(m => m.sessions.flatMap(s => s.blocks.flatMap(b => b.exercises)))
        .filter(ex => ex.exerciseId === exerciseId);
};
