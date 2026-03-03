import React from "react";

interface RiskBadgeProps {
  level: "LOW" | "OPTIMAL" | "HIGH" | string | null;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const config = {
    LOW: {
      color: "#3b82f6",
      label: "BAJO RIESGO",
      bg: "rgba(59, 130, 246, 0.1)",
    },
    OPTIMAL: {
      color: "#22c55e",
      label: "ÓPTIMO",
      bg: "rgba(34, 197, 94, 0.1)",
    },
    HIGH: {
      color: "#ef4444",
      label: "ALTO RIESGO",
      bg: "rgba(239, 68, 68, 0.1)",
    },
    DEFAULT: { color: "#64748b", label: "SIN DATOS", bg: "#f1f5f9" },
  };

  const current = config[level as keyof typeof config] || config.DEFAULT;

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: "900",
          color: "#64748b",
          letterSpacing: "0.1em",
        }}
      >
        ESTADO DE RIESGO
      </span>
      <div
        style={{
          padding: "10px 20px",
          borderRadius: "12px",
          backgroundColor: current.bg,
          color: current.color,
          fontWeight: "900",
          fontSize: "14px",
          border: `1px solid ${current.color}33`,
          letterSpacing: "0.05em",
        }}
      >
        {current.label}
      </div>
    </div>
  );
};
