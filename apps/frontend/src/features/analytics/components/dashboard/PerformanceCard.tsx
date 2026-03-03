import React from "react";

interface PerformanceCardProps {
  score: number;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ score }) => {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        border: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          opacity: 0.6,
          fontWeight: "700",
        }}
      >
        Performance Score
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: "4px",
          margin: "8px 0",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            margin: 0,
            color: "var(--primary)",
          }}
        >
          {score}
        </h1>
        <span style={{ fontSize: "18px", opacity: 0.5, fontWeight: "bold" }}>
          /100
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "11px",
          color: "#94a3b8",
          fontWeight: "bold",
        }}
      >
        ÚLTIMOS 7 DÍAS
      </p>
    </div>
  );
};
