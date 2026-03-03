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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let TemplatesService = class TemplatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        return this.prisma.programTemplate.create({
            data: {
                name: dto.title,
                description: dto.description,
                durationWeeks: dto.durationWeeks,
                createdById: userId,
                microcycles: {
                    create: dto.microcycles.map((m, index) => ({
                        weekNumber: index + 1,
                        sessions: {
                            create: m.sessions.map((s, sessionIndex) => ({
                                dayNumber: sessionIndex + 1,
                                title: s.title,
                                blocks: {
                                    create: s.blocks.map((b, blockIndex) => ({
                                        type: b.type,
                                        order: blockIndex + 1,
                                        exercises: {
                                            create: b.exercises.map((e) => ({
                                                exerciseName: e.name,
                                                targetSets: e.targetSets,
                                                targetReps: e.targetReps,
                                                targetRpe: e.targetRpe,
                                            })),
                                        },
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
        });
    }
    async getAll() {
        return this.prisma.programTemplate.findMany({
            include: {
                _count: {
                    select: {
                        assignments: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.programTemplate.findMany({
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
    async findOne(id) {
        const template = await this.prisma.programTemplate.findUnique({
            where: { id },
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
        return template;
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map