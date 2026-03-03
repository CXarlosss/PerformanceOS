import { useQuery } from '@tanstack/react-query';
import { coachAnalyticsApi } from '../../../api/coach.api';

export const useAthleteAnalytics = (athleteId: string, range: string = '12w') => {
    return useQuery({
        queryKey: ['athlete-history', athleteId, range],
        queryFn: () => coachAnalyticsApi.getAthleteHistory(athleteId, range),
        enabled: !!athleteId
    });
};
