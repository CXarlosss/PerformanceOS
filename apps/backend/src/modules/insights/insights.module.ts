import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { InsightsService } from "./insights.service";
import { InsightsController } from "./insights.controller";

@Module({
  controllers: [InsightsController],
  providers: [InsightsService, PrismaService],
  exports: [InsightsService],
})
export class InsightsModule {}
