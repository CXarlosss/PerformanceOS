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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const workload_service_1 = require("./workload.service");
const insights_service_1 = require("../../insights/insights.service");
let MetricsService = class MetricsService {
    constructor(prisma, workloadService, insightsService) {
        this.prisma = prisma;
        this.workloadService = workloadService;
        this.insightsService = insightsService;
    }
    async completeWorkout(workoutId) {
        const workout = await this.prisma.workoutSession.findUnique({
            where: { id: workoutId },
            include: {
                sets: true,
                assignedProgram: {
                    select: { athleteId: true },
                },
            },
        });
        if (!workout)
            throw new common_1.BadRequestException("Workout not found");
        if (workout.status === "COMPLETED")
            throw new common_1.BadRequestException("Workout already completed");
        if (!workout.sets.length)
            throw new common_1.BadRequestException("No sets registered");
        const athleteId = workout.assignedProgram.athleteId;
        const result = await this.prisma.$transaction(async (tx) => {
            const metrics = await this.calculateSessionMetrics(tx, workoutId, athleteId);
            return tx.workoutSession.update({
                where: { id: workoutId },
                data: {
                    ...metrics,
                    status: "COMPLETED",
                    completedAt: new Date(),
                },
            });
        });
        try {
            await this.insightsService.generateInsights(athleteId, workoutId);
        }
        catch (e) {
            console.error("Error generating insights:", e);
        }
        return result;
    }
    estimate1RM(load, reps) {
        return load * (1 + reps / 30);
    }
    async calculateSessionMetrics(tx, workoutId, athleteId) {
        const sets = await tx.workoutSet.findMany({
            where: { workoutSessionId: workoutId },
            select: {
                id: true,
                load: true,
                reps: true,
                rpe: true,
                assignedExerciseId: true,
            },
        });
        let sessionVolume = 0;
        let sessionFatigue = 0;
        let totalRPE = 0;
        for (const set of sets) {
            const volume = set.load * set.reps;
            const fatigue = volume * (set.rpe / 10);
            sessionVolume += volume;
            sessionFatigue += fatigue;
            totalRPE += set.rpe;
        }
        const avgRPE = sets.length > 0 ? totalRPE / sets.length : 0;
        const exerciseIds = [...new Set(sets.map((s) => s.assignedExerciseId))];
        const historicalSets = await tx.workoutSet.findMany({
            where: {
                assignedExerciseId: { in: exerciseIds },
                workoutSession: {
                    status: "COMPLETED",
                },
            },
            select: {
                assignedExerciseId: true,
                load: true,
                reps: true,
            },
        });
        const historicalMap = new Map();
        for (const hSet of historicalSets) {
            const oneRM = this.estimate1RM(hSet.load, hSet.reps);
            const currentMax = historicalMap.get(hSet.assignedExerciseId) ?? 0;
            if (oneRM > currentMax) {
                historicalMap.set(hSet.assignedExerciseId, oneRM);
            }
        }
        for (const set of sets) {
            const current1RM = this.estimate1RM(set.load, set.reps);
            const historicalMax = historicalMap.get(set.assignedExerciseId) ?? 0;
            if (current1RM > historicalMax) {
                await tx.workoutSet.update({
                    where: { id: set.id },
                    data: { isPR: true },
                });
                historicalMap.set(set.assignedExerciseId, current1RM);
            }
        }
        const workout = await tx.workoutSession.findUnique({
            where: { id: workoutId },
            select: { assignedProgramId: true },
        });
        const previousWorkouts = await tx.workoutSession.findMany({
            where: {
                assignedProgramId: workout.assignedProgramId,
                status: "COMPLETED",
            },
            orderBy: { date: "desc" },
            take: 4,
            select: { sessionVolume: true, sessionFatigue: true },
        });
        const avgHistoricalVolume = previousWorkouts.length > 0
            ? previousWorkouts.reduce((acc, w) => acc + (w.sessionVolume ?? 0), 0) /
                previousWorkouts.length
            : sessionVolume;
        const normalizedVolume = avgHistoricalVolume > 0 ? sessionVolume / avgHistoricalVolume : 1;
        const normalizedIntensity = avgRPE / 10;
        const rawScore = normalizedVolume * 0.6 + normalizedIntensity * 0.4;
        const sessionScore = Math.min(Math.round(rawScore * 100), 100);
        const overloadFlag = sessionVolume > avgHistoricalVolume * 1.25;
        const { acwr, riskLevel } = await this.workloadService.calculateACWR(tx, athleteId, sessionFatigue);
        return {
            sessionVolume,
            sessionFatigue,
            sessionScore,
            overloadFlag,
            acwr,
            riskLevel,
            fatigueModelVersion: 1,
        };
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workload_service_1.WorkloadService,
        insights_service_1.InsightsService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map