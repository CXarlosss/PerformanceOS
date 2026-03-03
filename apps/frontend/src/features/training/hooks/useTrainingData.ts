import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  programsApi,
  workoutsApi,
  analyticsApi,
  insightsApi,
} from "../api/training.api";

export const useCurrentProgram = () => {
  return useQuery({
    queryKey: ["program", "current"],
    queryFn: programsApi.getCurrent,
  });
};

export const usePostWorkoutSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutsApi.postSet,
    onSuccess: () => {
      // Invalidate queries to refresh data on dashboard and training list
      queryClient.invalidateQueries({ queryKey: ["program", "current"] });
      queryClient.invalidateQueries({ queryKey: ["analytics", "weekly"] });
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
  });
};

export const useWeeklyAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "weekly"],
    queryFn: analyticsApi.getWeekly,
  });
};

export const useAthleteDashboard = (athleteId: string | undefined) => {
  return useQuery({
    queryKey: ["analytics", "dashboard", athleteId],
    queryFn: () => analyticsApi.getDashboard(athleteId!),
    enabled: !!athleteId,
  });
};

export const useInsights = (athleteId: string | undefined) => {
  return useQuery({
    queryKey: ["insights", athleteId],
    queryFn: () => insightsApi.getAthleteInsights(athleteId!),
    enabled: !!athleteId,
  });
};

export const useMarkInsightRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insightsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
  });
};

export const useCoachDashboard = (coachId: string | undefined) => {
  return useQuery({
    queryKey: ["analytics", "coach", "dashboard", coachId],
    queryFn: () => analyticsApi.getCoachDashboard(coachId!),
    enabled: !!coachId,
  });
};
