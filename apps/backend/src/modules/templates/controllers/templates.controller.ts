import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TemplatesService } from '../services/templates.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
    constructor(private templatesService: TemplatesService) { }

    @Post()
    async create(@Body() dto: CreateTemplateDto, @Request() req: any) {
        return this.templatesService.create(dto, req.user.userId);
    }

    @Get()
    async findAll() {
        return this.templatesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.templatesService.findOne(id);
    }
}
