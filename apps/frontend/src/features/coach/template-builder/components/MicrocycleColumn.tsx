import React from "react";
import { useTemplateBuilder } from "../context/TemplateBuilderContext";
import type { BuilderMicrocycle } from "../types/builder.types";
import { SessionCard } from "./SessionCard";

interface Props {
  microcycle: BuilderMicrocycle;
}

export const MicrocycleColumn: React.FC<Props> = ({ microcycle }) => {
  const { addSession, removeMicrocycle } = useTemplateBuilder();

  return (
    <div
      style={{
        minWidth: "400px",
        maxWidth: "400px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
        background: "#f8fafc",
        borderRadius: "32px",
        border: "1px solid #e2e8f0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "900",
            color: "#0f172a",
            margin: 0,
          }}
        >
          {microcycle.name}
        </h2>
        <button
          onClick={() => removeMicrocycle(microcycle.id)}
          style={{
            border: "none",
            background: "transparent",
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          BORRAR SEMANA
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {microcycle.sessions.map((s: any) => (
          <SessionCard key={s.id} microcycleId={microcycle.id} session={s} />
        ))}

        <button
          onClick={() => addSession(microcycle.id)}
          className="btn-primary"
          style={{
            height: "64px",
            borderRadius: "20px",
            background: "white",
            color: "var(--primary)",
            border: "2px dashed var(--primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            fontWeight: "900",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          + AÑADIR SESIÓN
        </button>
      </div>
    </div>
  );
};
