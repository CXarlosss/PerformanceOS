import { Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { InsightsService } from "./insights.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("insights")
@UseGuards(JwtAuthGuard)
export class InsightsController {
  constructor(private insightsService: InsightsService) {}

  @Get("athletes/:athleteId")
  getActiveInsights(@Param("athleteId") athleteId: string) {
    return this.insightsService.getActiveInsights(athleteId);
  }

  @Patch(":id/read")
  markAsRead(@Param("id") id: string) {
    return this.insightsService.markAsRead(id);
  }

  @Post("athletes/:athleteId/trigger")
  triggerGeneration(@Param("athleteId") athleteId: string) {
    return this.insightsService.generateInsights(athleteId);
  }
}
