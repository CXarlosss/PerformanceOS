import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TemplatesService } from "../services/templates.service";
import { CreateTemplateDto } from "../dto/create-template.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("templates")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateTemplateDto, @Request() req: any) {
    return this.templatesService.create(dto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.templatesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.templatesService.findOne(id);
  }
}
