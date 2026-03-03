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
exports.CreateTemplateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TemplateExerciseDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TemplateExerciseDto.prototype, "exerciseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TemplateExerciseDto.prototype, "targetSets", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TemplateExerciseDto.prototype, "targetReps", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], TemplateExerciseDto.prototype, "targetRpe", void 0);
class TemplateBlockDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TemplateBlockDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TemplateExerciseDto),
    __metadata("design:type", Array)
], TemplateBlockDto.prototype, "exercises", void 0);
class TemplateSessionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TemplateSessionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TemplateBlockDto),
    __metadata("design:type", Array)
], TemplateSessionDto.prototype, "blocks", void 0);
class TemplateMicrocycleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TemplateMicrocycleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TemplateMicrocycleDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TemplateSessionDto),
    __metadata("design:type", Array)
], TemplateMicrocycleDto.prototype, "sessions", void 0);
class CreateTemplateDto {
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTemplateDto.prototype, "durationWeeks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TemplateMicrocycleDto),
    __metadata("design:type", Array)
], CreateTemplateDto.prototype, "microcycles", void 0);
//# sourceMappingURL=create-template.dto.js.map