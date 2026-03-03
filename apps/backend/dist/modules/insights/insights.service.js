"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const plateau_rule_1 = require("./rules/plateau.rule");
const acwr_rule_1 = require("./rules/acwr.rule");
const overload_rule_1 = require("./rules/overload.rule");
const progression_rule_1 = require("./rules/progression.rule");
let InsightsService = class InsightsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.rules = [
            new plateau_rule_1.PlateauRule(),
            new acwr_rule_1.AcwrRule(),
            new overload_rule_1.OverloadRule(),
            new progression_rule_1.ProgressionRule(),
        ];
    }
    async getActiveInsights(athleteId) {
        return this.prisma.insight.findMany({
            where: {
                athleteId,
                isRead: false,
            },
            orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
        });
    }
    async markAsRead(insightId) {
        return this.prisma.insight.update({
            where: { id: insightId },
            data: { isRead: true },
        });
    }
    async generateInsights(athleteId, currentSessionId) {
        const data = await this.collectAnalyticsData(athleteId);
        if (!data)
            return [];
        const generatedInsights = [];
        for (const rule of this.rules) {
            const result = rule.evaluate(data);
            if (result) {
                const recentDuplicate = await this.prisma.insight.findFirst({
                    where: {
                        athleteId,
                        type: result.type,
                        createdAt: {
                            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                        },
                    },
                });
                if (!recentDuplicate) {
                    const insight = await this.prisma.insight.create({
                        data: {
                            athleteId,
                            type: result.type,
                            severity: result.severity,
                            title: result.title,
                            message: result.message,
                            relatedSessionId: currentSessionId,
                        },
                    });
                    generatedInsights.push(insight);
                }
            }
        }
        return generatedInsights;
    }
    async collectAnalyticsData(athleteId) {
        const workouts = await this.prisma.workoutSession.findMany({
            where: {
                assignedProgram: { athleteId },
                status: "COMPLETED",
            },
            orderBy: { date: "desc" },
            take: 12,
        });
        if (workouts.length === 0)
            return null;
        const latest = workouts[0];
        const last4Weeks = workouts;
        const volumes = last4Weeks.map((w) => w.sessionVolume || 0);
        const scores = last4Weeks.map((w) => w.sessionScore || 0);
        const maxVolume = Math.max(...volumes);
        const minVolume = Math.min(...volumes);
        const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const prCount = await this.prisma.workoutSet.count({
            where: {
                workoutSession: {
                    assignedProgram: { athleteId },
                    date: { gte: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000) },
                },
                isPR: true,
            },
        });
        return {
            athleteId,
            acwr: latest.acwr || 1,
            sessionVolume: latest.sessionVolume || 0,
            sessionFatigue: latest.sessionFatigue || 0,
            sessionScore: latest.sessionScore || 0,
            avgScoreLast4Weeks: avgScore,
            avgVolumeLast4Weeks: avgVolume,
            volumeVariance: avgVolume > 0 ? (maxVolume - minVolume) / avgVolume : 0,
            scoreVariance: avgScore > 0 ? (maxScore - minScore) / avgScore : 0,
            prCountLast4Weeks: prCount,
            fatigueTrend: "stable",
        };
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InsightsService);
//# sourceMappingURL=insights.service.js.map