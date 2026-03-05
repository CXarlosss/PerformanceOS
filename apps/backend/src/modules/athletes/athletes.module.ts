import { Module } from "@nestjs/common";
import { AthletesService } from "./services/athletes.service";
import { AthletesController } from "./controllers/athletes.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { ProgramsModule } from "../programs/programs.module";

@Module({
  imports: [ProgramsModule],
  providers: [AthletesService, PrismaService],
  controllers: [AthletesController],
  exports: [AthletesService],
})
export class AthletesModule {}
