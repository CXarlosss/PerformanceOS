import { create } from "zustand";

type Role = "ADMIN" | "ATHLETE";

interface AppState {
  userId: string | null;
  role: Role | null;
  activeClientId: string | null;

  setUser: (id: string, role: Role) => void;
  setActiveAthlete: (athleteId: string) => void;
  getActiveClient: () => any;
  getActiveObjective: () => any;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userId: null,
  role: null,
  activeClientId: null,

  setUser: (id, role) =>
    set({
      userId: id,
      role,
    }),

  setActiveAthlete: (athleteId) =>
    set({
      activeClientId: athleteId,
    }),

  getActiveClient: () => {
    return { id: get().activeClientId, name: "Atleta Activo" };
  },

  getActiveObjective: () => {
    return { type: "HYPERTROPHY", description: "Ganancia muscular" };
  },

  logout: () =>
    set({
      userId: null,
      role: null,
      activeClientId: null,
    }),
}));
