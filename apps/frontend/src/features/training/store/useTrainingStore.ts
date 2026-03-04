import { create } from "zustand";

interface TrainingState {
  activeMicrocycle: any | null;
  trainingHistory: any[];

  setActiveMicrocycle: (microcycle: any) => void;
  setTrainingHistory: (history: any[]) => void;
  clearTrainingState: () => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  activeMicrocycle: null,
  trainingHistory: [],

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
      trainingHistory: [],
    }),
}));
