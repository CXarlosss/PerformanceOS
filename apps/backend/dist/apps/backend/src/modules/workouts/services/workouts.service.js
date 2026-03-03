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
const core_engine_1 = require("../../../../../../packages/core-engine/src");
let WorkoutsService = class WorkoutsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWorkoutSet(dto) {
        const athleteId = await this.getAthleteIdBySession(dto.workoutSessionId);
        const prevMax = await this.prisma.workoutSet.findFirst({
            where: {
                exerciseName: dto.exerciseName,
                workoutSession: {
                    assignedProgram: {
                        athleteId: athleteId
                    }
                }
            },
            orderBy: { load: 'desc' }
        });
        const isPR = !prevMax || dto.load > prevMax.load;
        const set = await this.prisma.workoutSet.create({
            data: {
                workoutSessionId: dto.workoutSessionId,
                exerciseName: dto.exerciseName,
                setNumber: dto.setNumber,
                reps: dto.reps,
                load: dto.load,
                rpe: dto.rpe,
                isPR: isPR,
            },
        });
        const session = await this.prisma.workoutSession.findUnique({
            where: { id: dto.workoutSessionId },
            include: {
                sets: true,
                templateSession: {
                    include: {
                        blocks: true
                    }
                }
            }
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        const mappedSession = this.mapToEngineSession(session);
        const exerciseMetaLookup = {};
        const volume = (0, core_engine_1.calculateSessionVolume)(mappedSession);
        const fatigue = (0, core_engine_1.calculateSessionFatigue)(mappedSession, exerciseMetaLookup);
        return {
            set,
            isPR,
            realtimeMetrics: {
                sessionVolume: volume,
                sessionFatigue: fatigue,
            }
        };
    }
    async getAthleteIdBySession(sessionId) {
        const session = await this.prisma.workoutSession.findUnique({
            where: { id: sessionId },
            include: { assignedProgram: true }
        });
        return session?.assignedProgram.athleteId || '';
    }
    mapToEngineSession(session) {
        return {
            id: session.id,
            name: session.templateSession?.title || 'Untitled',
            blocks: session.templateSession?.blocks.map((b) => ({
                id: b.id,
                type: b.type,
                exercises: session.sets
                    .reduce((acc, s) => {
                    let ex = acc.find(e => e.exerciseId === s.exerciseName);
                    if (!ex) {
                        ex = { exerciseId: s.exerciseName, sets: [] };
                        acc.push(ex);
                    }
                    ex.sets.push({ id: s.id, reps: s.reps, load: s.load, rpe: s.rpe });
                    return acc;
                }, [])
            })) || []
        };
    }
    async getSessionsForAthlete(userId) {
        return this.prisma.workoutSession.findMany({
            where: {
                assignedProgram: {
                    athlete: { userId }
                }
            },
            include: {
                sets: true,
                templateSession: true
            }
        });
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map