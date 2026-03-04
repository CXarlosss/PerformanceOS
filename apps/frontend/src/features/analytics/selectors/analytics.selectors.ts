import type { Microcycle } from "@performance-os/core-engine";
import { calculateMicrocycleVolume } from "@performance-os/core-engine";

export const selectCurrentMicrocycleMetrics = (
  microcycle: Microcycle | null,
) => {
  if (!microcycle) return null;
  return {
    volume: calculateMicrocycleVolume(microcycle),
    sessionCount: microcycle.sessions.length,
  };
};

export const selectHistoricalTrend = (history: Microcycle[]) => {
  return history.map((m: Microcycle) => ({
    id: m.id,
    volume: calculateMicrocycleVolume(m),
    label: `${m.startDate.slice(5)}`,
  }));
};

export const selectTopPRs = (history: Microcycle[], exerciseId: string) => {
  // This would be a more complex reduce in production
  return history
    .flatMap((m: any) =>
      m.sessions.flatMap((s: any) => s.blocks.flatMap((b: any) => b.exercises)),
    )
    .filter((ex: any) => ex.exerciseId === exerciseId);
};
