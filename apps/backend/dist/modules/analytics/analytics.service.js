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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAthleteDashboard(athleteId) {
        const workouts = await this.prisma.workoutSession.findMany({
            where: {
                assignedProgram: {
                    athleteId,
                },
                status: "COMPLETED",
            },
            select: {
                date: true,
                sessionVolume: true,
                sessionFatigue: true,
                sessionScore: true,
                acwr: true,
                riskLevel: true,
            },
            orderBy: { date: "asc" },
        });
        const weeklyMap = new Map();
        for (const workout of workouts) {
            if (!workout.date)
                continue;
            const weekStart = (0, date_fns_1.startOfWeek)(new Date(workout.date), {
                weekStartsOn: 1,
            }).toISOString();
            if (!weeklyMap.has(weekStart)) {
                weeklyMap.set(weekStart, { volume: 0, fatigue: 0 });
            }
            const current = weeklyMap.get(weekStart);
            current.volume += workout.sessionVolume ?? 0;
            current.fatigue += workout.sessionFatigue ?? 0;
        }
        const weeklyVolume = [];
        const weeklyFatigue = [];
        weeklyMap.forEach((value, key) => {
            weeklyVolume.push({ weekStart: key, total: value.volume });
            weeklyFatigue.push({ weekStart: key, total: value.fatigue });
        });
        const recentWorkouts = workouts.slice(-7);
        const avgPerformanceScore = recentWorkouts.length > 0
            ? recentWorkouts.reduce((acc, w) => acc + (w.sessionScore ?? 0), 0) / recentWorkouts.length
            : 0;
        const latestWorkout = workouts.length > 0 ? workouts[workouts.length - 1] : null;
        const recentPRs = await this.prisma.workoutSet.findMany({
            where: {
                workoutSession: {
                    assignedProgram: {
                        athleteId,
                    },
                },
                isPR: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: {
                assignedExercise: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
        return {
            weeklyVolume,
            weeklyFatigue,
            acwr: latestWorkout?.acwr ?? null,
            riskLevel: latestWorkout?.riskLevel ?? null,
            avgPerformanceScore: Math.round(avgPerformanceScore),
            recentPRs: recentPRs.map((pr) => ({
                exerciseName: pr.assignedExercise.exercise.name,
                load: pr.load,
                reps: pr.reps,
                date: pr.createdAt || new Date(),
            })),
        };
    }
    async getCoachDashboard(coachId) {
        const athletes = await this.prisma.athleteProfile.findMany({
            where: { coachId },
            include: {
                assignedPrograms: {
                    select: {
                        workoutSessions: {
                            where: { status: "COMPLETED" },
                            orderBy: { date: "desc" },
                            take: 1,
                            select: {
                                date: true,
                                acwr: true,
                                riskLevel: true,
                                sessionScore: true,
                            },
                        },
                    },
                },
                insights: {
                    where: { isRead: false },
                    select: {
                        severity: true,
                    },
                },
            },
        });
        const last7Days = (0, date_fns_1.subDays)(new Date(), 7);
        const dashboardData = await Promise.all(athletes.map(async (athlete) => {
            const allSessions = athlete.assignedPrograms.flatMap((p) => p.workoutSessions);
            const latestSession = allSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            const recentScores = (await this.prisma.workoutSession.aggregate({
                where: {
                    assignedProgram: { athleteId: athlete.id },
                    status: "COMPLETED",
                    date: { gte: last7Days },
                },
                _avg: {
                    sessionScore: true,
                },
            }));
            const activeInsights = athlete.insights;
            const highestSeverity = activeInsights.reduce((prev, curr) => {
                const levels = { LOW: 1, MEDIUM: 2, HIGH: 3 };
                return levels[curr.severity] > (levels[prev] || 0)
                    ? curr.severity
                    : prev;
            }, null);
            return {
                id: athlete.id,
                name: athlete.name,
                level: athlete.level,
                lastWorkout: latestSession?.date || null,
                acwr: latestSession?.acwr || null,
                riskLevel: latestSession?.riskLevel || "UNKNOWN",
                avgScore7d: Math.round(recentScores._avg?.sessionScore || 0),
                unreadInsightsCount: activeInsights.length,
                highestSeverity,
            };
        }));
        return dashboardData.sort((a, b) => {
            const riskOrder = {
                HIGH: 3,
                MEDIUM: 2,
                LOW: 1,
                OPTIMAL: 0,
                UNKNOWN: 0,
            };
            return (riskOrder[b.riskLevel] || 0) - (riskOrder[a.riskLevel] || 0);
        });
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map