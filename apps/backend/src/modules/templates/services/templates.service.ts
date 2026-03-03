import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateTemplateDto } from "../dto/create-template.dto";

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTemplateDto, userId: string) {
    return this.prisma.programTemplate.create({
      data: {
        name: dto.title,
        description: dto.description,
        durationWeeks: dto.durationWeeks,
        createdById: userId,
        microcycles: {
          create: dto.microcycles.map((m, microIndex) => ({
            weekNumber: microIndex + 1,
            order: microIndex + 1,
            sessions: {
              create: m.sessions.map((s, sessionIndex) => ({
                dayNumber: sessionIndex + 1,
                order: sessionIndex + 1,
                title: s.title,
                blocks: {
                  create: s.blocks.map((b, blockIndex) => ({
                    type: b.type,
                    order: blockIndex + 1,
                    exercises: {
                      create: b.exercises.map((e, exerciseIndex) => ({
                        exercise: {
                          connect: { id: e.exerciseId },
                        },
                        targetSets: e.targetSets,
                        targetReps: e.targetReps,
                        targetRpe: e.targetRpe,
                        order: exerciseIndex + 1,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  async getAll() {
    return this.prisma.programTemplate.findMany({
      include: {
        _count: {
          select: {
            assignments: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.programTemplate.findMany({
      include: {
        microcycles: {
          include: {
            sessions: {
              include: {
                blocks: {
                  include: {
                    exercises: {
                      include: {
                        exercise: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.programTemplate.findUnique({
      where: { id },
      include: {
        microcycles: {
          include: {
            sessions: {
              include: {
                blocks: {
                  include: {
                    exercises: {
                      include: {
                        exercise: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException("Template not found");
    }

    return template;
  }
}
