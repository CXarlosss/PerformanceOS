import { Controller, Get, UseGuards, Request, Param, Query } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) { }

    @Get('weekly')
    async getWeeklyAnalytics(@Request() req: any) {
        return this.analyticsService.getWeeklyAnalytics(req.user.userId);
    }

    @Get('coach/athletes/:id/history')
    async getAthleteHistory(
        @Param('id') id: string,
        @Query('range') range: string
    ) {
        return this.analyticsService.getAthleteHistory(id, range);
    }
}
