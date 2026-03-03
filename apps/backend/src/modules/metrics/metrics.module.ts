import { Module } from "@nestjs/common";
import { MetricsService } from "./services/metrics.service";
import { PRService } from "./services/pr.service";
import { WorkloadService } from "./services/workload.service";
import { PrismaService } from "../../prisma/prisma.service";
import { InsightsModule } from "../insights/insights.module";

@Module({
  imports: [InsightsModule],
  providers: [MetricsService, PRService, WorkloadService, PrismaService],
  exports: [MetricsService, PRService, WorkloadService],
})
export class MetricsModule {}
