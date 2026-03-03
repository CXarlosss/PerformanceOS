import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateWorkoutSetDto } from "../dto/create-workout-set.dto";
import { WorkoutSet } from "@prisma/client";
import {
  calculateSessionVolume,
  calculateSessionFatigue,
} from "@performance-os/core-engine";

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async registerSet(
    sessionId: string,
    dto: CreateWorkoutSetDto,
    athleteUserId: string,
  ) {
    // 1️⃣ Obtener sesión y validar ownership
    const session = await this.prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: {
        assignedProgram: {
          include: {
            athlete: true,
          },
        },
        sets: true,
      },
    });

    if (!session) {
      throw new NotFoundException("Workout session not found");
    }

    if (session.assignedProgram.athlete.userId !== athleteUserId) {
      throw new ForbiddenException("Unauthorized");
    }

    if (session.status === "COMPLETED") {
      throw new ForbiddenException("Session already completed");
    }

    // 2️⃣ Validar que el ejercicio pertenece a la sesión
    const assignedExercise = await this.prisma.assignedExercise.findUnique({
      where: { id: dto.assignedExerciseId },
      include: {
        block: {
          include: {
            session: true,
          },
        },
      },
    });

    if (!assignedExercise) {
      throw new NotFoundException("Assigned exercise not found");
    }

    if (assignedExercise.block.session.id !== session.assignedSessionId) {
      throw new ForbiddenException("Exercise does not belong to this session");
    }

    // 3️⃣ PR Detection profesional
    const prevMax = await this.prisma.workoutSet.findFirst({
      where: {
        assignedExerciseId: dto.assignedExerciseId,
        workoutSession: {
          assignedProgram: {
            athleteId: session.assignedProgram.athleteId,
          },
        },
      },
      orderBy: { load: "desc" },
    });

    const isPR = !prevMax || dto.load > prevMax.load;

    // 4️⃣ Crear set
    const set = await this.prisma.workoutSet.create({
      data: {
        workoutSessionId: sessionId,
        assignedExerciseId: dto.assignedExerciseId,
        setNumber: dto.setNumber,
        reps: dto.reps,
        load: dto.load,
        rpe: dto.rpe,
        isPR,
      },
    });

    // 5️⃣ Recalcular métricas servidor
    const updatedSession = await this.prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: { sets: true },
    });

    const mappedSession = {
      id: updatedSession!.id,
      blocks: [
        {
          exercises: updatedSession!.sets.map((s: WorkoutSet) => ({
            exerciseId: s.assignedExerciseId,
            sets: [
              {
                reps: s.reps,
                load: s.load,
                rpe: s.rpe,
              },
            ],
          })),
        },
      ],
    };

    const volume = calculateSessionVolume(mappedSession as any);
    const fatigue = calculateSessionFatigue(mappedSession as any, {});

    return {
      set,
      isPR,
      realtimeMetrics: {
        sessionVolume: volume,
        sessionFatigue: fatigue,
      },
    };
  }

  async getSessionsForAthlete(userId: string) {
    return this.prisma.workoutSession.findMany({
      where: {
        assignedProgram: {
          athlete: { userId },
        },
      },
      include: {
        sets: true,
        assignedSession: {
          include: {
            blocks: {
              include: {
                exercises: true,
              },
            },
          },
        },
      },
    });
  }
}
