import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ProgramsService } from "../services/programs.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";

@Controller("programs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get("current")
  async getCurrent(@Request() req: any) {
    return this.programsService.getCurrentProgram(req.user.id);
  }

  @Post("assign")
  @Roles(Role.ADMIN)
  async assign(@Body() dto: AssignProgramDto) {
    return this.programsService.assign(dto);
  }

  @Patch("assigned-exercises/:id")
  @Roles(Role.ADMIN)
  async updateAssignedExercise(
    @Param("id") id: string,
    @Body() dto: UpdateAssignedExerciseDto,
    @Request() req: any,
  ) {
    return this.programsService.updateAssignedExercise(id, dto, req.user.id);
  }
}
