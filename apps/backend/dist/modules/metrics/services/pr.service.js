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
exports.PRService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PRService = class PRService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    estimate1RM(load, reps) {
        return load * (1 + reps / 30);
    }
    async detectPR(assignedExerciseId, load, reps) {
        const current1RM = this.estimate1RM(load, reps);
        const previousSets = await this.prisma.workoutSet.findMany({
            where: {
                assignedExerciseId,
            },
            select: {
                load: true,
                reps: true,
            },
        });
        if (!previousSets.length)
            return true;
        const maxHistorical1RM = Math.max(...previousSets.map((set) => this.estimate1RM(set.load, set.reps)));
        return current1RM > maxHistorical1RM;
    }
};
exports.PRService = PRService;
exports.PRService = PRService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PRService);
//# sourceMappingURL=pr.service.js.map