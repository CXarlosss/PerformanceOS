import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
} from "@nestjs/common";
import { WorkoutsService } from "../services/workouts.service";
import { MetricsService } from "../../metrics/services/metrics.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("workouts")
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
  constructor(
    private workoutsService: WorkoutsService,
    private metricsService: MetricsService,
  ) {}

  // 🟢 Registrar set real del atleta
  @Post(":sessionId/sets")
  async registerSet(
    @Param("sessionId") sessionId: string,
    @Body() dto: CreateWorkoutSetDto,
    @Request() req: any,
  ) {
    return this.workoutsService.registerSet(sessionId, dto, req.user.userId);
  }

  // 🟢 Obtener sesiones del atleta autenticado
  @Get("me")
  async getMyWorkouts(@Request() req: any) {
    return this.workoutsService.getSessionsForAthlete(req.user.userId);
  }

  // 🏁 Finalizar sesión y calcular métricas
  @Patch(":id/complete")
  async completeWorkout(@Param("id") id: string) {
    return this.metricsService.completeWorkout(id);
  }
}
