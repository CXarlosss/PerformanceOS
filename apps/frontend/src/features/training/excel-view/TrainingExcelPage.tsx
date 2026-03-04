import React from "react";
import { useExcelTraining } from "./hooks/useExcelTraining";
import { TrainingTable } from "./components/TrainingTable";

export const TrainingExcelPage: React.FC = () => {
  const {
    program,
    isLoading,
    selectedWeek,
    setSelectedWeek,
    selectedSessionId,
    setSelectedSessionId,
    activeMicrocycle,
    currentWorkoutSession,
    tableData,
    postSet,
  } = useExcelTraining();

  if (isLoading) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* 🗓️ SEMANA SELECTOR */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "#f1f5f9",
            padding: "6px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              style={{
                padding: "8px 20px",
                border: "none",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "900",
                background: selectedWeek === w ? "white" : "transparent",
                color: selectedWeek === w ? "var(--primary)" : "#94a3b8",
                boxShadow:
                  selectedWeek === w
                    ? "0 4px 6px -1px rgba(0,0,0,0.1)"
                    : "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              SEMANA {w}
            </button>
          ))}
        </div>
      </header>

      <div
        className="card"
        style={{
          padding: "0 0 24px 0",
          border: "none",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        {/* 📋 DÍA / SESIÓN TABS */}
        <div
          style={{
            display: "flex",
            gap: "2px",
            borderBottom: "2px solid #f1f5f9",
            marginBottom: "24px",
          }}
        >
          {activeMicrocycle?.sessions.map((s: any) => (
            <button
              key={s.id}
              onClick={() => setSelectedSessionId(s.id)}
              style={{
                padding: "12px 24px",
                border: "none",
                borderBottom:
                  selectedSessionId === s.id
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
                background: "transparent",
                color: selectedSessionId === s.id ? "#0f172a" : "#94a3b8",
                fontSize: "13px",
                fontWeight: "800",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginBottom: "-2px",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* 📝 DATOS DE SESIÓN */}
        <div style={{ padding: "0px 0px 24px 0px" }}>
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "18px",
              fontWeight: "900",
              color: "#0f172a",
            }}
          >
            {
              activeMicrocycle?.sessions.find(
                (s: any) => s.id === selectedSessionId,
              )?.title
            }
          </h3>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
            Planificación: {program?.template?.title} • Fase:{" "}
            {activeMicrocycle?.name}
          </p>
        </div>

        {/* 📊 LA TABLA MAESTRA (EXCEL VIEW) */}
        {currentWorkoutSession ? (
          <TrainingTable
            data={tableData}
            workoutSessionId={currentWorkoutSession.id}
            onPostSet={async (p) => {
              await postSet(p);
            }}
          />
        ) : (
          <div
            className="card"
            style={{
              padding: "40px",
              textAlign: "center",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
            }}
          >
            <p
              style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748b" }}
            >
              Sesión no iniciada en la base de datos.
            </p>
            <button className="btn-primary" style={{ padding: "10px 24px" }}>
              COMENZAR REGISTRO
            </button>
          </div>
        )}
      </div>

      <style>{`.fadeIn { opacity: 0; animation: fadeIn 0.3s forwards; } @keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
};
