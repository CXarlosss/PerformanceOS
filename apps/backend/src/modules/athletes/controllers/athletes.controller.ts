import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AthletesService } from "../services/athletes.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { CreateAthleteDto } from "../dto/create-athlete.dto";
import { CreateAthleteOnboardingDto } from "../dto/create-athlete-onboarding.dto";

@Controller("athletes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AthletesController {
  constructor(private athletesService: AthletesService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateAthleteDto, @Req() req: any) {
    // El coachId es el ID del usuario autenticado (el coach)
    const coachId = req.user.id;
    return this.athletesService.create(dto, coachId);
  }

  @Post("onboard")
  @Roles(Role.ADMIN)
  async onboard(@Body() dto: CreateAthleteOnboardingDto, @Req() req: any) {
    const coachId = req.user.id;
    return this.athletesService.onboard(dto, coachId);
  }

  @Get()
  async findAll() {
    return this.athletesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.athletesService.findOne(id);
  }
}
