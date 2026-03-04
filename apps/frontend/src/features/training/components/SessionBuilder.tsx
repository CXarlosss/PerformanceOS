import React from "react";
import { useCurrentProgram, usePostWorkoutSet } from "../hooks/useTrainingData";
import type { Session } from "@performance-os/core-engine";

export const SessionBuilder: React.FC = () => {
  const { data: program, isLoading } = useCurrentProgram();
  const { mutateAsync: postSet, isPending: postingSet } = usePostWorkoutSet();

  // Find the active microcycle from the assigned program
  const activeMicrocycle =
    program?.template?.microcycles[program.currentWeek - 1];
  const workoutSessions = program?.workoutSessions || [];

  const handleAddSession = () => {
    // Create session in backend
  };

  const handleAddSet = async (
    sessionId: string,
    exerciseName: string,
    reps: number,
    load: number,
    rpe: number,
  ) => {
    try {
      await postSet({
        workoutSessionId: sessionId,
        exerciseName,
        setNumber: 1, // simplified for mvp
        reps,
        load,
        rpe,
      });
    } catch (e) {
      console.error("Error al registrar set");
    }
  };

  if (isLoading) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 🔴 CONTROL DE MICROCICLO */}
      <section className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span className="label">Programa Activo</span>
          <span
            className="badge"
            style={{ background: "#22c55e", color: "white" }}
          >
            SEMANA {program?.currentWeek}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              padding: "12px",
              background: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "bold" }}>
              {program?.template?.title}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              Fase: {activeMicrocycle?.name || "Carga"}
            </p>
          </div>
          <button
            onClick={handleAddSession}
            className="btn-primary"
            style={{ background: "#0f172a" }}
          >
            Nuevo Registro Directo
          </button>
        </div>
      </section>

      {/* 📋 SESIONES PENDIENTES (FROM TEMPLATE) */}
      <section className="card">
        <span className="label">Sesiones de la Microciclo</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {activeMicrocycle?.sessions.map((s: any) => {
            const isCompleted = workoutSessions.some(
              (ws: any) => ws.templateSessionId === s.id,
            );
            return (
              <div
                key={s.id}
                style={{
                  padding: "16px",
                  background: isCompleted ? "#f1f5f9" : "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  opacity: isCompleted ? 0.6 : 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {s.title}
                  </span>
                  {isCompleted && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      ✓ LISTO
                    </span>
                  )}
                </div>
                {!isCompleted &&
                  s.blocks[0]?.exercises.map((ex: any) => (
                    <div
                      key={ex.id}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <span style={{ fontSize: "12px", flex: 1 }}>
                        {ex.name}
                      </span>
                      <button
                        onClick={() => handleAddSet(s.id, ex.name, 5, 120, 8)}
                        className="btn-text"
                        style={{
                          fontSize: "10px",
                          padding: "4px 8px",
                          border: "1px solid #e2e8f0",
                        }}
                        disabled={postingSet}
                      >
                        + Set 120kg
                      </button>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* 📊 HISTORIAL RECIENTE (VIA API) */}
      {workoutSessions.length > 0 && (
        <section className="card">
          <span className="label">Actividad Reciente (Real DB)</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            {workoutSessions.slice(0, 5).map((s: any) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "#fcfcfc",
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {s.templateSession?.title}
                  </span>
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                    {new Date(s.date).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  {s.sets.length} sets
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
