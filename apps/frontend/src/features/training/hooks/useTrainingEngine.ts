import { useMemo } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { useTrainingStore } from "../store/useTrainingStore";
import { systemConfig } from "../../../data/config";
import { EXERCISES } from "../../../data/exercises";
import type { ConsolidatedMetrics } from "@performance-os/core-engine";
import {
  calculateSessionVolume,
  calculateMicrocycleVolume,
  calculateAverageIntensityPerSession,
  calculateSessionFatigue,
  compareAgainstHistory,
  calculateVolumeDelta,
} from "@performance-os/core-engine";

export const useTrainingEngine = () => {
  const { getActiveClient, getActiveObjective } = useAppStore();
  const { activeMicrocycle, trainingHistory } = useTrainingStore();

  const client = getActiveClient();
  const objective = getActiveObjective();

  const metrics: ConsolidatedMetrics | null = useMemo(() => {
    if (!activeMicrocycle || activeMicrocycle.sessions.length === 0)
      return null;

    const lastSession =
      activeMicrocycle.sessions[activeMicrocycle.sessions.length - 1];

    const sessionVolume = calculateSessionVolume(lastSession);
    const weeklyVolume = calculateMicrocycleVolume(activeMicrocycle);
    const averageIntensity = calculateAverageIntensityPerSession(lastSession);
    const fatigueScore = calculateSessionFatigue(lastSession, EXERCISES);

    const prHistory: Record<string, number> = {};

    const allSessionExercises = lastSession.blocks.flatMap(
      (b: any) => b.exercises,
    );
    const newPRs = compareAgainstHistory(
      allSessionExercises,
      prHistory,
      systemConfig.prThreshold,
    );

    const history = client?.id ? trainingHistory[client.id] || [] : [];
    const prevMicrocycle = history[history.length - 1];
    const prevVolume = prevMicrocycle
      ? calculateMicrocycleVolume(prevMicrocycle as any)
      : 0;
    const volumeDelta = calculateVolumeDelta(weeklyVolume, prevVolume);

    const overloadWarning = volumeDelta > systemConfig.volumeAlerts.high;
    const progressionPercentage = volumeDelta * 100;

    return {
      sessionVolume,
      weeklyVolume,
      averageIntensity,
      fatigueScore,
      newPRs,
      overloadWarning,
      progressionPercentage,
    };
  }, [activeMicrocycle, trainingHistory]);

  return {
    client,
    objective,
    metrics,
    activeMicrocycle,
  };
};
