import { create } from "zustand";

interface TrainingState {
  activeMicrocycle: any | null;
  trainingHistory: Record<string, any[]>;

  setActiveMicrocycle: (microcycle: any) => void;
  setTrainingHistory: (history: Record<string, any[]>) => void;
  clearTrainingState: () => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  activeMicrocycle: null,
  trainingHistory: {},

  setActiveMicrocycle: (microcycle) =>
    set({
      activeMicrocycle: microcycle,
    }),

  setTrainingHistory: (history) =>
    set({
      trainingHistory: history,
    }),

  clearTrainingState: () =>
    set({
      activeMicrocycle: null,
      trainingHistory: {},
    }),
}));
