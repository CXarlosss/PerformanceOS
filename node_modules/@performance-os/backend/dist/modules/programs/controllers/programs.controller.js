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
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const programs_service_1 = require("../services/programs.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const assign_program_dto_1 = require("../dto/assign-program.dto");
const update_assigned_exercise_dto_1 = require("../dto/update-assigned-exercise.dto");
let ProgramsController = class ProgramsController {
    constructor(programsService) {
        this.programsService = programsService;
    }
    async getCurrent(req) {
        return this.programsService.getCurrentProgram(req.user.userId);
    }
    async assign(dto) {
        return this.programsService.assign(dto);
    }
    async updateAssignedExercise(id, dto, req) {
        return this.programsService.updateAssignedExercise(id, dto, req.user.userId);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Get)("current"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "getCurrent", null);
__decorate([
    (0, common_1.Post)("assign"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_program_dto_1.AssignProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "assign", null);
__decorate([
    (0, common_1.Patch)("assigned-exercises/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assigned_exercise_dto_1.UpdateAssignedExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "updateAssignedExercise", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, common_1.Controller)("programs"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map