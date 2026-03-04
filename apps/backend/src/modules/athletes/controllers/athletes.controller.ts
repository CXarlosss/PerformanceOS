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
import { CreateAthleteDto } from "../dto/create-athlete.dto";

@Controller("athletes")
@UseGuards(JwtAuthGuard)
export class AthletesController {
  constructor(private athletesService: AthletesService) {}

  @Post()
  async create(@Body() dto: CreateAthleteDto, @Req() req: any) {
    // El coachId es el ID del usuario autenticado (el coach)
    const coachId = req.user.userId;
    return this.athletesService.create(dto, coachId);
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
