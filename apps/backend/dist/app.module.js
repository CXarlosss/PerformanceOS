"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./modules/auth/auth.module");
const workouts_module_1 = require("./modules/workouts/workouts.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const programs_module_1 = require("./modules/programs/programs.module");
const templates_module_1 = require("./modules/templates/templates.module");
const athletes_module_1 = require("./modules/athletes/athletes.module");
const metrics_module_1 = require("./modules/metrics/metrics.module");
const insights_module_1 = require("./modules/insights/insights.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 60,
                },
            ]),
            auth_module_1.AuthModule,
            workouts_module_1.WorkoutsModule,
            analytics_module_1.AnalyticsModule,
            programs_module_1.ProgramsModule,
            templates_module_1.TemplatesModule,
            athletes_module_1.AthletesModule,
            metrics_module_1.MetricsModule,
            insights_module_1.InsightsModule,
        ],
        controllers: [],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map