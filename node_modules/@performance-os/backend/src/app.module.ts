import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from "./modules/auth/auth.module";
import { WorkoutsModule } from "./modules/workouts/workouts.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { ProgramsModule } from "./modules/programs/programs.module";
import { TemplatesModule } from "./modules/templates/templates.module";
import { AthletesModule } from "./modules/athletes/athletes.module";
import { MetricsModule } from "./modules/metrics/metrics.module";
import { InsightsModule } from "./modules/insights/insights.module";

@Module({
  imports: [
    // 🌍 Configuración Global
    ConfigModule.forRoot({ isGlobal: true }),

    // 🛡️ Rate Limiting: 60 requests per minute per IP
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),

    AuthModule,
    WorkoutsModule,
    AnalyticsModule,
    ProgramsModule,
    TemplatesModule,
    AthletesModule,
    MetricsModule,
    InsightsModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    // 🛡️ Bind ThrottlerGuard globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
