import { Module } from '@nestjs/common';
import { ProgramsService } from './services/programs.service';
import { ProgramsController } from './controllers/programs.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [ProgramsService, PrismaService],
    controllers: [ProgramsController],
    exports: [ProgramsService]
})
export class ProgramsModule { }
