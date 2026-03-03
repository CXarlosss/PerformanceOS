import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesApi, athletesApi, coachProgramsApi } from '../api/coach.api';

export const useTemplates = () => {
    return useQuery({
        queryKey: ['templates'],
        queryFn: templatesApi.getAll
    });
};

export const useAthletes = () => {
    return useQuery({
        queryKey: ['athletes'],
        queryFn: athletesApi.getAll
    });
};

export const useAthleteDetail = (id: string) => {
    return useQuery({
        queryKey: ['athletes', id],
        queryFn: () => athletesApi.getOne(id),
        enabled: !!id
    });
};

export const useCreateTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: templatesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] });
        }
    });
};

export const useAssignProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: coachProgramsApi.assign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['athletes'] });
        }
    });
};
