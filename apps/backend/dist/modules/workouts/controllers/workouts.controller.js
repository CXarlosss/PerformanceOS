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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutsController = void 0;
const common_1 = require("@nestjs/common");
const workouts_service_1 = require("../services/workouts.service");
const metrics_service_1 = require("../../metrics/services/metrics.service");
const create_workout_set_dto_1 = require("../dto/create-workout-set.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let WorkoutsController = class WorkoutsController {
    constructor(workoutsService, metricsService) {
        this.workoutsService = workoutsService;
        this.metricsService = metricsService;
    }
    async registerSet(sessionId, dto, req) {
        return this.workoutsService.registerSet(sessionId, dto, req.user.userId);
    }
    async getMyWorkouts(req) {
        return this.workoutsService.getSessionsForAthlete(req.user.userId);
    }
    async completeWorkout(id) {
        return this.metricsService.completeWorkout(id);
    }
};
exports.WorkoutsController = WorkoutsController;
__decorate([
    (0, common_1.Post)(":sessionId/sets"),
    __param(0, (0, common_1.Param)("sessionId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_workout_set_dto_1.CreateWorkoutSetDto, Object]),
    __metadata("design:returntype", Promise)
], WorkoutsController.prototype, "registerSet", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkoutsController.prototype, "getMyWorkouts", null);
__decorate([
    (0, common_1.Patch)(":id/complete"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutsController.prototype, "completeWorkout", null);
exports.WorkoutsController = WorkoutsController = __decorate([
    (0, common_1.Controller)("workouts"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [workouts_service_1.WorkoutsService,
        metrics_service_1.MetricsService])
], WorkoutsController);
//# sourceMappingURL=workouts.controller.js.map