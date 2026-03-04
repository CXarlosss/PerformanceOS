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
exports.AthletesController = void 0;
const common_1 = require("@nestjs/common");
const athletes_service_1 = require("../services/athletes.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const create_athlete_dto_1 = require("../dto/create-athlete.dto");
let AthletesController = class AthletesController {
    constructor(athletesService) {
        this.athletesService = athletesService;
    }
    async create(dto, req) {
        const coachId = req.user.userId;
        return this.athletesService.create(dto, coachId);
    }
    async findAll() {
        return this.athletesService.findAll();
    }
    async findOne(id) {
        return this.athletesService.findOne(id);
    }
};
exports.AthletesController = AthletesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_athlete_dto_1.CreateAthleteDto, Object]),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AthletesController.prototype, "findOne", null);
exports.AthletesController = AthletesController = __decorate([
    (0, common_1.Controller)("athletes"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [athletes_service_1.AthletesService])
], AthletesController);
//# sourceMappingURL=athletes.controller.js.map