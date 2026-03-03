import { apiClient } from "../../../api/apiClient";

export const programsApi = {
  getCurrent: async () => {
    const { data } = await apiClient.get("/programs/current");
    return data;
  },
};

export const workoutsApi = {
  postSet: async (payload: any) => {
    const { data } = await apiClient.post("/workouts/set", payload);
    return data;
  },
};

export const analyticsApi = {
  getWeekly: async () => {
    const { data } = await apiClient.get("/analytics/weekly");
    return data;
  },
  getDashboard: async (athleteId: string) => {
    const { data } = await apiClient.get(
      `/analytics/athletes/${athleteId}/dashboard`,
    );
    return data;
  },
  getCoachDashboard: async (coachId: string) => {
    const { data } = await apiClient.get(
      `/analytics/coach/${coachId}/dashboard`,
    );
    return data;
  },
};

export const insightsApi = {
  getAthleteInsights: async (athleteId: string) => {
    const { data } = await apiClient.get(`/insights/athletes/${athleteId}`);
    return data;
  },
  markAsRead: async (insightId: string) => {
    const { data } = await apiClient.patch(`/insights/${insightId}/read`);
    return data;
  },
};
