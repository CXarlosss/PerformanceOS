export interface BuilderExercise {
  id: string;
  name: string;
  exerciseId?: string; // Nuevo: Para vincular con el catálogo global
  targetSets: number;
  targetReps: number;
  targetRpe: number;
}

export interface BuilderBlock {
  id: string;
  type: string;
  exercises: BuilderExercise[];
}

export interface BuilderSession {
  id: string;
  title: string;
  blocks: BuilderBlock[];
}

export interface BuilderMicrocycle {
  id: string;
  name: string;
  weekNumber: number; // Ya lo teníamos pero ahora será clave en el payload
  sessions: BuilderSession[];
}

export interface BuilderTemplate {
  title: string;
  description: string;
  durationWeeks: number;
  microcycles: BuilderMicrocycle[];
}
