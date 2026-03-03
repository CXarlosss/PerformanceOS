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
const prisma_service_1 = require("../../../prisma/prisma.service");
const core_engine_1 = require("@performance-os/core-engine");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWeeklyAnalytics(userId) {
        const program = await this.prisma.assignedProgram.findFirst({
            where: { athlete: { userId }, status: "ACTIVE" },
            include: {
                workoutSessions: { include: { sets: true } },
                template: { include: { microcycles: true } },
            },
        });
        if (!program)
            throw new common_1.NotFoundException("Athlete has no active program");
        const history = await this.prisma.assignedProgram.findMany({
            where: { athlete: { userId }, status: "COMPLETED" },
            include: { workoutSessions: { include: { sets: true } } },
            orderBy: { startDate: "desc" },
            take: 3,
        });
        const currentVolume = this.volumeAggregator(program.workoutSessions);
        const prevVolume = history.length > 0
            ? this.volumeAggregator(history[0].workoutSessions)
            : 0;
        const progression = (0, core_engine_1.calculateVolumeProgression)(currentVolume, prevVolume);
        const consistency = (0, core_engine_1.calculateConsistencyIndex)(program.template.durationWeeks * 4, program.workoutSessions.filter((s) => s.status === "COMPLETED").length);
        const score = (0, core_engine_1.calculatePerformanceScore)(progression / 100, consistency / 100, 0.5, 1);
        return {
            weeklyVolume: currentVolume,
            volumeTrend: progression,
            performanceScore: score,
            pushPullRatio: 1.1,
            overloadWarning: progression > 20,
        };
    }
    async getAthleteHistory(athleteId, range = "12w") {
        const cutoffDate = new Date();
        if (range === "4w")
            cutoffDate.setDate(cutoffDate.getDate() - 28);
        else if (range === "8w")
            cutoffDate.setDate(cutoffDate.getDate() - 56);
        else if (range === "12w")
            cutoffDate.setDate(cutoffDate.getDate() - 84);
        else
            cutoffDate.setTime(0);
        const sessions = await this.prisma.workoutSession.findMany({
            where: {
                assignedProgram: { athleteId },
                date: { gte: cutoffDate },
            },
            include: {
                sets: {
                    include: {
                        assignedExercise: {
                            include: {
                                exercise: true,
                            },
                        },
                    },
                },
                assignedSession: {
                    include: {
                        blocks: {
                            include: {
                                exercises: {
                                    include: {
                                        exercise: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { date: "asc" },
        });
        if (sessions.length === 0)
            return {
                weeklyMetrics: [],
                exerciseProgress: {},
                alerts: {},
                trendAnalysis: {},
            };
        const weeksMap = new Map();
        sessions.forEach((s) => {
            const weekNum = this.getWeekNumber(s.date);
            if (!weeksMap.has(weekNum))
                weeksMap.set(weekNum, []);
            weeksMap.get(weekNum)?.push(s);
        });
        const weeklyMetrics = [];
        const sortedWeeks = Array.from(weeksMap.keys()).sort((a, b) => a - b);
        let prevVolume = 0;
        let prevFatigue = 0;
        sortedWeeks.forEach((weekNum, index) => {
            const weekSessions = weeksMap.get(weekNum) || [];
            const volume = this.volumeAggregator(weekSessions);
            const fatigue = weekSessions.reduce((total, s) => total +
                s.sets.reduce((st, set) => st + set.load * set.reps * (set.rpe / 10), 0), 0);
            const prs = weekSessions.reduce((total, s) => total + s.sets.filter((set) => set.isPR).length, 0);
            const volumeDelta = prevVolume > 0 ? ((volume - prevVolume) / prevVolume) * 100 : 0;
            const fatigueDelta = prevFatigue > 0 ? ((fatigue - prevFatigue) / prevFatigue) * 100 : 0;
            weeklyMetrics.push({
                week: index + 1,
                volume,
                volumeDelta,
                fatigue,
                fatigueDelta,
                performanceScore: 70 + Math.random() * 20,
                prs,
                pushPullRatio: 1.1 + Math.random() * 0.2,
            });
            prevVolume = volume;
            prevFatigue = fatigue;
        });
        const exerciseProgress = {};
        sessions.forEach((s) => {
            s.sets.forEach((set) => {
                const exerciseName = set.assignedExercise.exercise.name;
                if (!exerciseProgress[exerciseName])
                    exerciseProgress[exerciseName] = [];
                const e1rm = set.load * (1 + set.reps / 30);
                exerciseProgress[exerciseName].push({
                    date: s.date.toISOString().split("T")[0],
                    estimated1RM: Math.round(e1rm * 10) / 10,
                    volume: set.load * set.reps,
                });
            });
        });
        const alerts = {
            overloadRisk: this.detectOverloadRisk(weeklyMetrics),
            chronicFatigueRisk: this.detectChronicFatigue(weeklyMetrics),
            stagnationExercises: this.detectStagnation(exerciseProgress),
        };
        const trendAnalysis = {
            volumeTrend: this.calculateTrend(weeklyMetrics.map((m) => m.volume)),
            scoreTrend: this.calculateTrend(weeklyMetrics.map((m) => m.performanceScore)),
            fatigueTrend: this.calculateTrend(weeklyMetrics.map((m) => m.fatigue)),
        };
        return { weeklyMetrics, exerciseProgress, alerts, trendAnalysis };
    }
    volumeAggregator(sessions) {
        return sessions.reduce((total, s) => {
            return (total +
                s.sets.reduce((st, set) => st + set.load * set.reps, 0));
        }, 0);
    }
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
    detectOverloadRisk(metrics) {
        if (metrics.length < 2)
            return false;
        const last = metrics[metrics.length - 1];
        return last.volumeDelta > 15 && last.fatigueDelta > 20;
    }
    detectChronicFatigue(metrics) {
        if (metrics.length < 3)
            return false;
        const trend = metrics.slice(-3).every((m) => m.fatigueDelta > 0);
        return trend;
    }
    detectStagnation(exerciseProgress) {
        const stagnations = [];
        Object.keys(exerciseProgress).forEach((ex) => {
            const data = exerciseProgress[ex];
            if (data.length < 4)
                return;
            const last = data[data.length - 1].estimated1RM;
            const prev = data[data.length - 4].estimated1RM;
            if (last <= prev)
                stagnations.push(ex);
        });
        return stagnations;
    }
    calculateTrend(values) {
        if (values.length < 2)
            return "STABLE";
        const last = values[values.length - 1];
        const prev = values[values.length - 2];
        const diff = ((last - prev) / prev) * 100;
        if (diff > 5)
            return "ASCENDING";
        if (diff < -5)
            return "DESCENDING";
        return "PLATEAU";
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map