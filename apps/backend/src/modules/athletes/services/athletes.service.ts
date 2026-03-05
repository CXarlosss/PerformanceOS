import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateAthleteDto } from "../dto/create-athlete.dto";
import { CreateAthleteOnboardingDto } from "../dto/create-athlete-onboarding.dto";
import { ProgramsService } from "../../programs/services/programs.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AthletesService {
  constructor(
    private prisma: PrismaService,
    private programsService: ProgramsService,
  ) {}

  async onboard(dto: CreateAthleteOnboardingDto, coachId: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException("Este email ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.$transaction(async (tx) => {
      // 1. Crear el usuario con rol ATHLETE
      const user = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash: hashedPassword,
          role: "ATHLETE",
        },
      });

      // 2. Crear el perfil de atleta vinculado
      const athlete = await tx.athleteProfile.create({
        data: {
          name: dto.name,
          level: dto.level,
          userId: user.id,
          coachId: coachId,
        },
      });

      // 3. Opcionalmente asignar programa
      if (dto.templateId && dto.startDate) {
        await this.programsService.assign(
          {
            templateId: dto.templateId,
            athleteId: athlete.id,
            startDate: dto.startDate,
          },
          tx,
        );
      }

      return athlete;
    });
  }

  async create(dto: CreateAthleteDto, coachId: string) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.$transaction(async (tx) => {
      // 1. Crear el usuario con rol ATHLETE
      const user = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash: hashedPassword,
          role: "ATHLETE",
        },
      });

      // 2. Crear el perfil de atleta vinculado
      return tx.athleteProfile.create({
        data: {
          name: dto.name,
          level: dto.level,
          userId: user.id,
          coachId: coachId,
        },
      });
    });
  }

  async findAll() {
    return this.prisma.athleteProfile.findMany({
      include: {
        assignedPrograms: true,
        coach: true,
      },
    });
  }

  async findOne(id: string) {
    const athlete = await this.prisma.athleteProfile.findUnique({
      where: { id },
      include: {
        assignedPrograms: {
          include: {
            microcycles: {
              include: {
                sessions: {
                  include: {
                    blocks: {
                      include: { exercises: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!athlete) {
      throw new NotFoundException("Athlete not found");
    }

    return athlete;
  }
}
