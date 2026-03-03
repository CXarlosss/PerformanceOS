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
exports.WorkloadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let WorkloadService = class WorkloadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateAcuteLoad(tx, athleteId) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const workouts = await tx.workoutSession.findMany({
            where: {
                assignedProgram: {
                    athleteId,
                },
                status: "COMPLETED",
                date: { gte: sevenDaysAgo },
            },
            select: { sessionFatigue: true },
        });
        return workouts.reduce((acc, w) => acc + (w.sessionFatigue ?? 0), 0);
    }
    async calculateChronicLoad(tx, athleteId) {
        const twentyEightDaysAgo = new Date();
        twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);
        const workouts = await tx.workoutSession.findMany({
            where: {
                assignedProgram: {
                    athleteId,
                },
                status: "COMPLETED",
                date: { gte: twentyEightDaysAgo },
            },
            select: { sessionFatigue: true },
        });
        const totalFatigue = workouts.reduce((acc, w) => acc + (w.sessionFatigue ?? 0), 0);
        return totalFatigue / 4;
    }
    async calculateACWR(tx, athleteId, currentSessionFatigue) {
        const acute = await this.calculateAcuteLoad(tx, athleteId);
        const totalAcute = acute + currentSessionFatigue;
        const chronic = await this.calculateChronicLoad(tx, athleteId);
        if (chronic === 0)
            return { acwr: 1, riskLevel: "OPTIMAL" };
        const acwr = totalAcute / chronic;
        let riskLevel = "OPTIMAL";
        if (acwr > 1.5)
            riskLevel = "HIGH";
        else if (acwr < 0.8)
            riskLevel = "LOW";
        return { acwr, riskLevel };
    }
};
exports.WorkloadService = WorkloadService;
exports.WorkloadService = WorkloadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkloadService);
//# sourceMappingURL=workload.service.js.map