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
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const core_engine_1 = require("@performance-os/core-engine");
let WorkoutsService = class WorkoutsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerSet(sessionId, dto, athleteUserId) {
        const session = await this.prisma.workoutSession.findUnique({
            where: { id: sessionId },
            include: {
                assignedProgram: {
                    include: {
                        athlete: true,
                    },
                },
                sets: true,
            },
        });
        if (!session) {
            throw new common_1.NotFoundException("Workout session not found");
        }
        if (session.assignedProgram.athlete.userId !== athleteUserId) {
            throw new common_1.ForbiddenException("Unauthorized");
        }
        if (session.status === "COMPLETED") {
            throw new common_1.ForbiddenException("Session already completed");
        }
        const assignedExercise = await this.prisma.assignedExercise.findUnique({
            where: { id: dto.assignedExerciseId },
            include: {
                block: {
                    include: {
                        session: true,
                    },
                },
            },
        });
        if (!assignedExercise) {
            throw new common_1.NotFoundException("Assigned exercise not found");
        }
        if (assignedExercise.block.session.id !== session.assignedSessionId) {
            throw new common_1.ForbiddenException("Exercise does not belong to this session");
        }
        const prevMax = await this.prisma.workoutSet.findFirst({
            where: {
                assignedExerciseId: dto.assignedExerciseId,
                workoutSession: {
                    assignedProgram: {
                        athleteId: session.assignedProgram.athleteId,
                    },
                },
            },
            orderBy: { load: "desc" },
        });
        const isPR = !prevMax || dto.load > prevMax.load;
        const set = await this.prisma.workoutSet.create({
            data: {
                workoutSessionId: sessionId,
                assignedExerciseId: dto.assignedExerciseId,
                setNumber: dto.setNumber,
                reps: dto.reps,
                load: dto.load,
                rpe: dto.rpe,
                isPR,
            },
        });
        const updatedSession = await this.prisma.workoutSession.findUnique({
            where: { id: sessionId },
            include: { sets: true },
        });
        const mappedSession = {
            id: updatedSession.id,
            blocks: [
                {
                    exercises: updatedSession.sets.map((s) => ({
                        exerciseId: s.assignedExerciseId,
                        sets: [
                            {
                                reps: s.reps,
                                load: s.load,
                                rpe: s.rpe,
                            },
                        ],
                    })),
                },
            ],
        };
        const volume = (0, core_engine_1.calculateSessionVolume)(mappedSession);
        const fatigue = (0, core_engine_1.calculateSessionFatigue)(mappedSession, {});
        return {
            set,
            isPR,
            realtimeMetrics: {
                sessionVolume: volume,
                sessionFatigue: fatigue,
            },
        };
    }
    async getSessionsForAthlete(userId) {
        return this.prisma.workoutSession.findMany({
            where: {
                assignedProgram: {
                    athlete: { userId },
                },
            },
            include: {
                sets: true,
                assignedSession: {
                    include: {
                        blocks: {
                            include: {
                                exercises: true,
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map