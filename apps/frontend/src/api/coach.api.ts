import { apiClient } from "./apiClient";

export const templatesApi = {
  create: async (payload: any) => {
    const { data } = await apiClient.post("templates", payload);
    return data;
  },
  getAll: async () => {
    const { data } = await apiClient.get("templates");
    return data;
  },
  getOne: async (id: string) => {
    const { data } = await apiClient.get(`templates/${id}`);
    return data;
  },
};

export const athletesApi = {
  getAll: async () => {
    const { data } = await apiClient.get("athletes");
    return data;
  },
  getOne: async (id: string) => {
    const { data } = await apiClient.get(`athletes/${id}`);
    return data;
  },
};

export const coachProgramsApi = {
  assign: async (payload: {
    templateId: string;
    athleteId: string;
    startDate: string;
  }) => {
    const { data } = await apiClient.post("programs/assign", payload);
    return data;
  },
};

export const coachAnalyticsApi = {
  getAthleteHistory: async (id: string, range: string = "12w") => {
    const { data } = await apiClient.get(
      `analytics/coach/athletes/${id}/history`,
      { params: { range } },
    );
    return data;
  },
};
