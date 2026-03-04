import { apiClient } from "./apiClient";

export const programsApi = {
  getCurrent: async () => {
    const { data } = await apiClient.get("programs/current");
    return data;
  },
};

export const workoutsApi = {
  postSet: async (payload: {
    workoutSessionId: string;
    exerciseName: string;
    setNumber: number;
    reps: number;
    load: number;
    rpe: number;
  }) => {
    const { data } = await apiClient.post("workouts/set", payload);
    return data;
  },
};

export const analyticsApi = {
  getWeekly: async () => {
    const { data } = await apiClient.get("analytics/weekly");
    return data;
  },
};
