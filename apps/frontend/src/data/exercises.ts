import type { ExerciseMetadata } from "@performance-os/core-engine";

export const EXERCISES: Record<string, ExerciseMetadata> = {
  SQUAT: {
    id: "SQUAT",
    name: "Sentadilla con Barra",
    category: "Pierna",
    fatigueCoefficient: 8,
  },
  BENCH: {
    id: "BENCH",
    name: "Press de Banca",
    category: "Empuje",
    fatigueCoefficient: 6,
  },
  DEADLIFT: {
    id: "DEADLIFT",
    name: "Peso Muerto",
    category: "Tracción",
    fatigueCoefficient: 10,
  },
  OHP: {
    id: "OHP",
    name: "Press Militar",
    category: "Empuje",
    fatigueCoefficient: 6,
  },
  PULLUP: {
    id: "PULLUP",
    name: "Dominadas",
    category: "Tracción",
    fatigueCoefficient: 4,
  },
};

export const EXERCISE_LIST = Object.values(EXERCISES);
