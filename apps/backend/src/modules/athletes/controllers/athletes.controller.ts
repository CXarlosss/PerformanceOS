import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AthletesService } from "../services/athletes.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("athletes")
@UseGuards(JwtAuthGuard)
export class AthletesController {
  constructor(private athletesService: AthletesService) {}

  @Get()
  async findAll() {
    return this.athletesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.athletesService.findOne(id);
  }
}
