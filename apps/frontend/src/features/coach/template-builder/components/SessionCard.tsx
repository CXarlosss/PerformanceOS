import React from "react";
import { useTemplateBuilder } from "../context/TemplateBuilderContext";
import type { BuilderSession } from "../types/builder.types";
import { BlockCard } from "./BlockCard";

interface Props {
  microcycleId: string;
  session: BuilderSession;
}

export const SessionCard: React.FC<Props> = ({ microcycleId, session }) => {
  const { addBlock, removeSession, updateSession } = useTemplateBuilder();

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        padding: "24px",
        marginBottom: "24px",
        border: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          value={session.title}
          onChange={(e) =>
            updateSession(microcycleId, session.id, { title: e.target.value })
          }
          style={{
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
            outline: "none",
            color: "#1e293b",
          }}
        />
        <button
          onClick={() => removeSession(microcycleId, session.id)}
          style={{
            border: "none",
            background: "transparent",
            color: "#ef4444",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ELIMINAR SESIÓN
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {session.blocks.map((b) => (
          <BlockCard
            key={b.id}
            microcycleId={microcycleId}
            sessionId={session.id}
            block={b}
          />
        ))}

        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          {["Fuerza", "Hipertrofia", "Cardio", "Prep"].map((type) => (
            <button
              key={type}
              onClick={() =>
                addBlock(microcycleId, session.id, type.toUpperCase())
              }
              style={{
                flex: 1,
                padding: "10px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              + {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
