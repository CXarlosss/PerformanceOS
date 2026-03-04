import React from "react";
import { useTemplateBuilder } from "../context/TemplateBuilderContext";
import type { BuilderExercise } from "../types/builder.types";

interface Props {
  microcycleId: string;
  sessionId: string;
  blockId: string;
  exercise: BuilderExercise;
}

export const ExerciseRow: React.FC<Props> = ({
  microcycleId,
  sessionId,
  blockId,
  exercise,
}) => {
  const { updateExercise, removeExercise } = useTemplateBuilder();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 1fr) 50px 50px 50px 32px",
        gap: "8px",
        alignItems: "center",
        padding: "8px 12px",
        background: "white",
        borderRadius: "8px",
        border: "1px solid #f1f5f9",
        marginBottom: "4px",
      }}
    >
      <input
        value={exercise.name}
        onChange={(e) =>
          updateExercise(microcycleId, sessionId, blockId, exercise.id, {
            name: e.target.value,
          })
        }
        style={{
          border: "none",
          fontSize: "12px",
          fontWeight: "bold",
          outline: "none",
          background: "transparent",
        }}
      />
      <input
        type="number"
        value={exercise.targetSets}
        onChange={(e) =>
          updateExercise(microcycleId, sessionId, blockId, exercise.id, {
            targetSets: parseInt(e.target.value),
          })
        }
        style={{
          border: "1px solid #f1f5f9",
          borderRadius: "4px",
          textAlign: "center",
          fontSize: "11px",
          padding: "4px",
        }}
      />
      <input
        type="number"
        value={exercise.targetReps}
        onChange={(e) =>
          updateExercise(microcycleId, sessionId, blockId, exercise.id, {
            targetReps: parseInt(e.target.value),
          })
        }
        style={{
          border: "1px solid #f1f5f9",
          borderRadius: "4px",
          textAlign: "center",
          fontSize: "11px",
          padding: "4px",
        }}
      />
      <input
        type="number"
        value={exercise.targetRpe}
        onChange={(e) =>
          updateExercise(microcycleId, sessionId, blockId, exercise.id, {
            targetRpe: parseInt(e.target.value),
          })
        }
        style={{
          border: "1px solid #f1f5f9",
          borderRadius: "4px",
          textAlign: "center",
          fontSize: "11px",
          padding: "4px",
        }}
      />
      <button
        onClick={() =>
          removeExercise(microcycleId, sessionId, blockId, exercise.id)
        }
        style={{
          border: "none",
          background: "transparent",
          color: "#cbd5e1",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ×
      </button>
    </div>
  );
};
