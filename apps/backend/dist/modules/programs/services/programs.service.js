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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProgramsService = class ProgramsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assign(dto) {
        const template = await this.prisma.programTemplate.findUnique({
            where: { id: dto.templateId },
            include: {
                microcycles: {
                    include: {
                        sessions: {
                            include: {
                                blocks: {
                                    include: {
                                        exercises: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!template) {
            throw new common_1.NotFoundException("Template not found");
        }
        const assignedProgram = await this.prisma.assignedProgram.create({
            data: {
                templateId: template.id,
                athleteId: dto.athleteId,
                startDate: new Date(dto.startDate),
                status: "ACTIVE",
            },
        });
        for (const micro of template.microcycles) {
            const assignedMicro = await this.prisma.assignedMicrocycle.create({
                data: {
                    assignedProgramId: assignedProgram.id,
                    weekNumber: micro.weekNumber,
                },
            });
            for (const session of micro.sessions) {
                const assignedSession = await this.prisma.assignedSession.create({
                    data: {
                        microcycleId: assignedMicro.id,
                        dayNumber: session.dayNumber,
                        title: session.title,
                    },
                });
                for (const block of session.blocks) {
                    const assignedBlock = await this.prisma.assignedBlock.create({
                        data: {
                            sessionId: assignedSession.id,
                            type: block.type,
                            order: block.order,
                        },
                    });
                    for (const ex of block.exercises) {
                        await this.prisma.assignedExercise.create({
                            data: {
                                blockId: assignedBlock.id,
                                exerciseName: ex.exerciseName,
                                targetSets: ex.targetSets,
                                targetReps: ex.targetReps,
                                targetRpe: ex.targetRpe,
                            },
                        });
                    }
                }
            }
        }
        return assignedProgram;
    }
    async getCurrentProgram(userId) {
        const athlete = await this.prisma.athleteProfile.findUnique({
            where: { userId },
        });
        if (!athlete)
            return null;
        return this.prisma.assignedProgram.findFirst({
            where: {
                athleteId: athlete.id,
                status: "ACTIVE",
            },
            include: {
                microcycles: {
                    include: {
                        sessions: {
                            include: {
                                blocks: {
                                    include: {
                                        exercises: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async updateAssignedExercise(exerciseId, dto, coachUserId) {
        const exercise = await this.prisma.assignedExercise.findUnique({
            where: { id: exerciseId },
            include: {
                block: {
                    include: {
                        session: {
                            include: {
                                microcycle: {
                                    include: {
                                        assignedProgram: {
                                            include: {
                                                athlete: {
                                                    include: {
                                                        coach: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!exercise) {
            throw new common_1.NotFoundException("Assigned exercise not found");
        }
        const coachId = exercise.block.session.microcycle.assignedProgram.athlete.coach?.id;
        if (!coachId || coachId !== coachUserId) {
            throw new common_1.ForbiddenException("Unauthorized");
        }
        return this.prisma.assignedExercise.update({
            where: { id: exerciseId },
            data: dto,
        });
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map