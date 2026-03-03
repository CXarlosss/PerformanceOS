import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { WorkoutSet } from "@prisma/client";

@Injectable()
export class PRService {
  constructor(private prisma: PrismaService) {}

  private estimate1RM(load: number, reps: number): number {
    return load * (1 + reps / 30);
  }

  async detectPR(
    assignedExerciseId: string,
    load: number,
    reps: number,
  ): Promise<boolean> {
    const current1RM = this.estimate1RM(load, reps);

    const previousSets = await this.prisma.workoutSet.findMany({
      where: {
        assignedExerciseId,
        // Solo comparamos con sets de sesiones ya completadas o sets anteriores
        // Para simplificar según el prompt:
      },
      select: {
        load: true,
        reps: true,
      },
    });

    if (!previousSets.length) return true;

    const maxHistorical1RM = Math.max(
      ...previousSets.map((set: Pick<WorkoutSet, "load" | "reps">) =>
        this.estimate1RM(set.load, set.reps),
      ),
    );

    return current1RM > maxHistorical1RM;
  }
}
