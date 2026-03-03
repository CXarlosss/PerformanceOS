import { useState, useMemo } from 'react';
import { useCurrentProgram, usePostWorkoutSet } from '../../hooks/useTrainingData';

export const useExcelTraining = () => {
    const { data: program, isLoading } = useCurrentProgram();
    const { mutateAsync: postSet } = usePostWorkoutSet();

    const [selectedWeek, setSelectedWeek] = useState<number>(1);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    const activeMicrocycle = useMemo(() => {
        if (!program) return null;
        return program.template.microcycles[selectedWeek - 1] ?? null;
    }, [program, selectedWeek]);

    useMemo(() => {
        if (
            activeMicrocycle &&
            !selectedSessionId &&
            activeMicrocycle.sessions.length > 0
        ) {
            setSelectedSessionId(activeMicrocycle.sessions[0].id);
        }
    }, [activeMicrocycle, selectedSessionId]);

    const currentSessionTemplate = useMemo(() => {
        if (!activeMicrocycle) return null;
        return (
            activeMicrocycle.sessions.find(
                (s) => s.id === selectedSessionId
            ) ?? null
        );
    }, [activeMicrocycle, selectedSessionId]);

    const currentWorkoutSession = useMemo(() => {
        if (!program || !selectedSessionId) return null;
        return (
            program.workoutSessions.find(
                (ws) => ws.templateSessionId === selectedSessionId
            ) ?? null
        );
    }, [program, selectedSessionId]);

    const tableData = useMemo(() => {
        if (!currentSessionTemplate) return [];

        return currentSessionTemplate.blocks.flatMap((block) =>
            block.exercises.map((ex) => ({
                id: ex.id,
                name: ex.name,
                target: `${ex.targetSets}x${ex.targetReps} @${ex.targetRpe}`,
                sets:
                    currentWorkoutSession?.sets.filter(
                        (s) => s.exerciseName === ex.name
                    ) ?? [],
                targetSets: ex.targetSets,
            }))
        );
    }, [currentSessionTemplate, currentWorkoutSession]);

    return {
        program,
        isLoading,
        selectedWeek,
        setSelectedWeek,
        selectedSessionId,
        setSelectedSessionId,
        activeMicrocycle,
        currentSessionTemplate,
        currentWorkoutSession,
        tableData,
        postSet,
    };
};