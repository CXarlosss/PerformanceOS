import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get("athletes/:athleteId/dashboard")
  getDashboard(@Param("athleteId") athleteId: string) {
    return this.analyticsService.getAthleteDashboard(athleteId);
  }

  @Get("coach/:coachId/dashboard")
  getCoachDashboard(@Param("coachId") coachId: string) {
    return this.analyticsService.getCoachDashboard(coachId);
  }
}
