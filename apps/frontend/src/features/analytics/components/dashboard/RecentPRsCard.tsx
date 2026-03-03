import React from "react";

interface PR {
  exerciseName: string;
  load: number;
  reps: number;
  date: string;
}

interface RecentPRsCardProps {
  prs: PR[];
}

export const RecentPRsCard: React.FC<RecentPRsCardProps> = ({ prs }) => {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "900",
          marginBottom: "20px",
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>🥇</span> Récords Personales Recientes
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {prs.length > 0 ? (
          prs.map((pr, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: "900",
                    color: "#0f172a",
                  }}
                >
                  {pr.exerciseName}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "bold",
                  }}
                >
                  {new Date(pr.date).toLocaleDateString()}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "900",
                    color: "var(--primary)",
                    background: "#0f172a",
                    padding: "4px 10px",
                    borderRadius: "8px",
                  }}
                >
                  {pr.load}kg × {pr.reps}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            No se han detectado PRs recientemente.
          </p>
        )}
      </div>
    </div>
  );
};
