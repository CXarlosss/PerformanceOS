import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class AthletesService {
  constructor(private prisma: PrismaService) {}

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
