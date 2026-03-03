import { Module } from "@nestjs/common";
import { WorkoutsService } from "./services/workouts.service";
import { WorkoutsController } from "./controllers/workouts.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { MetricsModule } from "../metrics/metrics.module";

@Module({
  imports: [MetricsModule],
  providers: [WorkoutsService, PrismaService],
  controllers: [WorkoutsController],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
