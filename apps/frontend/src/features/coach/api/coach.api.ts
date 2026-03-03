import { apiClient } from "../../../api/apiClient";
// ==========================
// TEMPLATES
// ==========================

export const templatesApi = {
    getAll: async () => {
        const { data } = await apiClient.get('/templates');
        return data;
    },

    create: async (payload: any) => {
        const { data } = await apiClient.post('/templates', payload);
        return data;
    },
};

// ==========================
// ATHLETES
// ==========================

export const athletesApi = {
    getAll: async () => {
        const { data } = await apiClient.get('/athletes');
        return data;
    },

    getOne: async (id: string) => {
        const { data } = await apiClient.get(`/athletes/${id}`);
        return data;
    },
};

// ==========================
// PROGRAM ASSIGNMENT
// ==========================

export const coachProgramsApi = {
    assign: async (payload: { athleteId: string; templateId: string }) => {
        const { data } = await apiClient.post('/programs/assign', payload);
        return data;
    },
};