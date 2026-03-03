import { useMemo } from 'react';
import { useTrainingEngine } from '../../training/hooks/useTrainingEngine';
import { useTrainingStore } from '../../training/store/useTrainingStore';
import { useAppStore } from '../../../store/useAppStore';
import { EXERCISES } from '../../../data/exercises';
import {
    calculateVolumeProgression,
    calculateConsistencyIndex,
    calculateVolumeByMuscleGroup,
    calculatePushPullRatio,
    detectMuscleImbalance,
    calculatePerformanceScore,
    calculateMicrocycleVolume
} from '@performance-os/core-engine';

export const useAnalytics = () => {
    const { activeClientId } = useAppStore();
    const { metrics: trainingMetrics, activeMicrocycle } = useTrainingEngine();
    const { trainingHistory } = useTrainingStore();

    const clientHistory = useMemo(() => trainingHistory[activeClientId] || [], [trainingHistory, activeClientId]);

    const analytics = useMemo(() => {
        if (!activeMicrocycle) return null;

        const currentMetrics = {
            volume: calculateMicrocycleVolume(activeMicrocycle),
            sessionCount: activeMicrocycle.sessions.length,
            fatigue: trainingMetrics?.fatigueScore || 0,
        };

        const prevMicrocycle = clientHistory[clientHistory.length - 1];
        const prevVolume = prevMicrocycle ? calculateMicrocycleVolume(prevMicrocycle) : 0;

        // 1. Performance metrics
        const volumeTrend = calculateVolumeProgression(currentMetrics.volume, prevVolume);

        // 2. Balance metrics (from last session for high-level insight)
        const lastSession = activeMicrocycle.sessions[activeMicrocycle.sessions.length - 1];
        const muscleVolumes = lastSession ? calculateVolumeByMuscleGroup(lastSession, EXERCISES) : {};
        const pushPullRatio = calculatePushPullRatio(muscleVolumes);
        const imbalanceWarning = detectMuscleImbalance(pushPullRatio);

        // 3. Consistency (assume 4 planned sessions per week for now)
        const sessionsPlanned = 4; // Mock planned goal
        const consistency = calculateConsistencyIndex(sessionsPlanned, activeMicrocycle.sessions.length);

        // 4. Scoring (weighted 0-1 metrics)
        const score = calculatePerformanceScore(
            volumeTrend / 100, // as factor
            consistency / 100, // as factor
            1 - (currentMetrics.fatigue / 5000), // simplistic fatigue management
            1 // target alignment (mocked)
        );

        return {
            weeklyVolume: currentMetrics.volume,
            volumeTrend,
            fatigueScore: currentMetrics.fatigue,
            pushPullRatio,
            imbalanceWarning,
            newPRs: trainingMetrics?.newPRs || [],
            performanceScore: score,
            muscleVolumes,
        };
    }, [activeMicrocycle, trainingMetrics, clientHistory]);

    return {
        analytics,
        clientHistory,
    };
};
