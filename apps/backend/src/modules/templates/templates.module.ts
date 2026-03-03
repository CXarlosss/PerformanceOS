import { Module } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { TemplatesController } from './controllers/templates.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [TemplatesService, PrismaService],
    controllers: [TemplatesController],
    exports: [TemplatesService]
})
export class TemplatesModule { }
