import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { AssignProgramDto } from "../dto/assign-program.dto";
import { UpdateAssignedExerciseDto } from "../dto/update-assigned-exercise.dto";

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async assign(dto: AssignProgramDto, tx?: any) {
    const client = tx || this.prisma;

    const template = await client.programTemplate.findUnique({
      where: { id: dto.templateId },
      include: {
        microcycles: {
          include: {
            sessions: {
              include: {
                blocks: {
                  include: {
                    exercises: true,
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

    const assignedProgram = await client.assignedProgram.create({
      data: {
        templateId: template.id,
        athleteId: dto.athleteId,
        startDate: new Date(dto.startDate),
        status: "ACTIVE",
      },
    });

    for (const micro of template.microcycles) {
      const assignedMicro = await client.assignedMicrocycle.create({
        data: {
          assignedProgramId: assignedProgram.id,
          weekNumber: micro.weekNumber,
          order: micro.order,
        },
      });

      for (const session of micro.sessions) {
        const assignedSession = await client.assignedSession.create({
          data: {
            microcycleId: assignedMicro.id,
            dayNumber: session.dayNumber,
            title: session.title,
            order: session.order,
          },
        });

        for (const block of session.blocks) {
          const assignedBlock = await client.assignedBlock.create({
            data: {
              sessionId: assignedSession.id,
              type: block.type,
              order: block.order,
            },
          });

          for (const ex of block.exercises) {
            await client.assignedExercise.create({
              data: {
                blockId: assignedBlock.id,
                exerciseId: ex.exerciseId,
                targetSets: ex.targetSets,
                targetReps: ex.targetReps,
                targetRpe: ex.targetRpe,
              },
            });
          }
        }
      }
    }

    return assignedProgram;
  }

  async getCurrentProgram(userId: string) {
    const athlete = await this.prisma.athleteProfile.findUnique({
      where: { userId },
    });

    if (!athlete) return null;

    return this.prisma.assignedProgram.findFirst({
      where: {
        athleteId: athlete.id,
        status: "ACTIVE",
      },
      include: {
        microcycles: {
          orderBy: { order: "asc" },
          include: {
            sessions: {
              orderBy: { order: "asc" },
              include: {
                blocks: {
                  orderBy: { order: "asc" },
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

  async updateAssignedExercise(
    exerciseId: string,
    dto: UpdateAssignedExerciseDto,
    coachUserId: string,
  ) {
    const exercise = await this.prisma.assignedExercise.findUnique({
      where: { id: exerciseId },
      include: {
        block: {
          include: {
            session: {
              include: {
                microcycle: {
                  include: {
                    assignedProgram: {
                      include: {
                        athlete: {
                          include: {
                            coach: true,
                          },
                        },
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

    if (!exercise) {
      throw new NotFoundException("Assigned exercise not found");
    }

    const coachId =
      exercise.block.session.microcycle.assignedProgram.athlete.coach?.id;

    if (!coachId || coachId !== coachUserId) {
      throw new ForbiddenException("Unauthorized");
    }

    return this.prisma.assignedExercise.update({
      where: { id: exerciseId },
      data: dto,
    });
  }
}
