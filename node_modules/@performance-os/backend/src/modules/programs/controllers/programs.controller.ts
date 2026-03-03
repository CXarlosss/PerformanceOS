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
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";

@Controller("programs")
@UseGuards(JwtAuthGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get("current")
  async getCurrent(@Request() req: any) {
    return this.programsService.getCurrentProgram(req.user.userId);
  }

  @Post("assign")
  async assign(@Body() dto: AssignProgramDto) {
    return this.programsService.assign(dto);
  }

  @Patch("assigned-exercises/:id")
  async updateAssignedExercise(
    @Param("id") id: string,
    @Body() dto: UpdateAssignedExerciseDto,
    @Request() req: any,
  ) {
    return this.programsService.updateAssignedExercise(
      id,
      dto,
      req.user.userId,
    );
  }
}
