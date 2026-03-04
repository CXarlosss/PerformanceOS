import React from "react";
import { useTemplateBuilder } from "../context/TemplateBuilderContext";
import type { BuilderBlock } from "../types/builder.types";
import { ExerciseRow } from "./ExerciseRow";

interface Props {
  microcycleId: string;
  sessionId: string;
  block: BuilderBlock;
}

export const BlockCard: React.FC<Props> = ({
  microcycleId,
  sessionId,
  block,
}) => {
  const { addExercise, removeBlock } = useTemplateBuilder();

  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        padding: "16px",
        marginBottom: "12px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "900",
            letterSpacing: "0.05em",
            background: "#e0f2fe",
            color: "#0369a1",
            padding: "4px 8px",
            borderRadius: "6px",
          }}
        >
          BLOQUE: {block.type}
        </span>
        <button
          onClick={() => removeBlock(microcycleId, sessionId, block.id)}
          style={{
            border: "none",
            background: "transparent",
            color: "#94a3b8",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Borrar Bloque
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {block.exercises.map((e: any) => (
          <ExerciseRow
            key={e.id}
            microcycleId={microcycleId}
            sessionId={sessionId}
            blockId={block.id}
            exercise={e}
          />
        ))}
        <button
          onClick={() =>
            addExercise(microcycleId, sessionId, block.id, "Nuevo Ejercicio")
          }
          style={{
            marginTop: "8px",
            border: "2px dashed #cbd5e1",
            borderRadius: "8px",
            padding: "8px",
            background: "transparent",
            color: "#64748b",
            fontSize: "11px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + AÑADIR EJERCICIO
        </button>
      </div>
    </div>
  );
};
