import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

import type {
  BuilderTemplate,
  BuilderSession,
  BuilderExercise,
} from "../types/builder.types";

interface TemplateBuilderContextType {
  template: BuilderTemplate;
  updateMetadata: (
    title: string,
    description: string,
    duration: number,
  ) => void;
  addMicrocycle: () => void;
  removeMicrocycle: (id: string) => void;
  addSession: (microcycleId: string) => void;
  removeSession: (microcycleId: string, sessionId: string) => void;
  updateSession: (
    microcycleId: string,
    sessionId: string,
    updates: Partial<BuilderSession>,
  ) => void;
  addBlock: (microcycleId: string, sessionId: string, type: string) => void;
  removeBlock: (
    microcycleId: string,
    sessionId: string,
    blockId: string,
  ) => void;
  addExercise: (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    name: string,
  ) => void;
  updateExercise: (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    exerciseId: string,
    updates: Partial<BuilderExercise>,
  ) => void;
  removeExercise: (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    exerciseId: string,
  ) => void;
  setTemplate: React.Dispatch<React.SetStateAction<BuilderTemplate>>;
}

const TemplateBuilderContext = createContext<
  TemplateBuilderContextType | undefined
>(undefined);

export const TemplateBuilderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [template, setTemplate] = useState<BuilderTemplate>({
    title: "Nueva Plantilla",
    description: "Descripción de la planificación",
    durationWeeks: 1,
    microcycles: [
      {
        id: nanoid(),
        name: "Semana 1",
        weekNumber: 1,
        sessions: [],
      },
    ],
  });

  const updateMetadata = (
    title: string,
    description: string,
    durationWeeks: number,
  ) => {
    setTemplate((prev) => ({ ...prev, title, description, durationWeeks }));
  };

  const addMicrocycle = () => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: [
        ...prev.microcycles,
        {
          id: nanoid(),
          name: `Semana ${prev.microcycles.length + 1}`,
          weekNumber: prev.microcycles.length + 1,
          sessions: [],
        },
      ],
    }));
  };

  const removeMicrocycle = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.filter((m: any) => m.id !== id),
    }));
  };

  const addSession = (microcycleId: string) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: [
                ...m.sessions,
                {
                  id: nanoid(),
                  title: `Día ${m.sessions.length + 1}`,
                  blocks: [],
                },
              ],
            }
          : m,
      ),
    }));
  };

  const removeSession = (microcycleId: string, sessionId: string) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.filter((s: any) => s.id !== sessionId),
            }
          : m,
      ),
    }));
  };

  const updateSession = (
    microcycleId: string,
    sessionId: string,
    updates: Partial<BuilderSession>,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId ? { ...s, ...updates } : s,
              ),
            }
          : m,
      ),
    }));
  };

  const addBlock = (microcycleId: string, sessionId: string, type: string) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId
                  ? {
                      ...s,
                      blocks: [
                        ...s.blocks,
                        { id: nanoid(), type, exercises: [] },
                      ],
                    }
                  : s,
              ),
            }
          : m,
      ),
    }));
  };

  const removeBlock = (
    microcycleId: string,
    sessionId: string,
    blockId: string,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId
                  ? {
                      ...s,
                      blocks: s.blocks.filter((b: any) => b.id !== blockId),
                    }
                  : s,
              ),
            }
          : m,
      ),
    }));
  };

  const addExercise = (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    name: string,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId
                  ? {
                      ...s,
                      blocks: s.blocks.map((b: any) =>
                        b.id === blockId
                          ? {
                              ...b,
                              exercises: [
                                ...b.exercises,
                                {
                                  id: nanoid(),
                                  name,
                                  targetSets: 3,
                                  targetReps: 10,
                                  targetRpe: 8,
                                },
                              ],
                            }
                          : b,
                      ),
                    }
                  : s,
              ),
            }
          : m,
      ),
    }));
  };

  const updateExercise = (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    exerciseId: string,
    updates: Partial<BuilderExercise>,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId
                  ? {
                      ...s,
                      blocks: s.blocks.map((b: any) =>
                        b.id === blockId
                          ? {
                              ...b,
                              exercises: b.exercises.map((e: any) =>
                                e.id === exerciseId ? { ...e, ...updates } : e,
                              ),
                            }
                          : b,
                      ),
                    }
                  : s,
              ),
            }
          : m,
      ),
    }));
  };

  const removeExercise = (
    microcycleId: string,
    sessionId: string,
    blockId: string,
    exerciseId: string,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      microcycles: prev.microcycles.map((m: any) =>
        m.id === microcycleId
          ? {
              ...m,
              sessions: m.sessions.map((s: any) =>
                s.id === sessionId
                  ? {
                      ...s,
                      blocks: s.blocks.map((b: any) =>
                        b.id === blockId
                          ? {
                              ...b,
                              exercises: b.exercises.filter(
                                (e: any) => e.id !== exerciseId,
                              ),
                            }
                          : b,
                      ),
                    }
                  : s,
              ),
            }
          : m,
      ),
    }));
  };

  return (
    <TemplateBuilderContext.Provider
      value={{
        template,
        updateMetadata,
        addMicrocycle,
        removeMicrocycle,
        addSession,
        removeSession,
        updateSession,
        addBlock,
        removeBlock,
        addExercise,
        updateExercise,
        removeExercise,
        setTemplate,
      }}
    >
      {children}
    </TemplateBuilderContext.Provider>
  );
};

export const useTemplateBuilder = () => {
  const context = useContext(TemplateBuilderContext);
  if (!context) {
    throw new Error(
      "useTemplateBuilder must be used within a TemplateBuilderProvider",
    );
  }
  return context;
};
