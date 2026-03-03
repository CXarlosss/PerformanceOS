import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCoachDashboard } from "../../training/hooks/useTrainingData";
import {
  AlertTriangle,
  Activity,
  TrendingUp,
  ChevronRight,
  User,
} from "lucide-react";

export const CoachDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: roster, isLoading } = useCoachDashboard(user?.id);

  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", opacity: 0.5 }}>
        <Activity className="animate-spin" style={{ margin: "0 auto 16px" }} />
        <p style={{ fontWeight: "bold", color: "#64748b" }}>
          Sincronizando Roster de Atletas...
        </p>
      </div>
    );
  }

  const highRiskCount =
    roster?.filter((a: any) => a.riskLevel === "HIGH").length || 0;
  const insightsCount =
    roster?.reduce((acc: number, a: any) => acc + a.unreadInsightsCount, 0) ||
    0;
  const avgScore = roster?.length
    ? Math.round(
        roster.reduce((acc: number, a: any) => acc + a.avgScore7d, 0) /
          roster.length,
      )
    : 0;

  const stats = [
    {
      label: "Roster Total",
      value: roster?.length || 0,
      icon: <User size={18} />,
      color: "#3b82f6",
    },
    {
      label: "Alerta Roja",
      value: highRiskCount,
      icon: <AlertTriangle size={18} />,
      color: "#ef4444",
    },
    {
      label: "Insights AI",
      value: insightsCount,
      icon: <Activity size={18} />,
      color: "#8b5cf6",
    },
    {
      label: "Avg Performance",
      value: `${avgScore}%`,
      icon: <TrendingUp size={18} />,
      color: "#10b981",
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "#ef4444";
      case "OPTIMAL":
        return "#22c55e";
      case "LOW":
        return "#3b82f6";
      default:
        return "#94a3b8";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 🚀 CONTROL CENTER RIBBON */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="card"
            style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border:
                s.value > 0 && s.label === "Alerta Roja"
                  ? "2px solid #fee2e2"
                  : "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: `${s.color}10`,
                color: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {s.icon}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#0f172a",
                }}
              >
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ⚖️ RISK RANKING TABLE */}
      <section className="card" style={{ padding: "0", overflow: "hidden" }}>
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "900",
                color: "#0f172a",
              }}
            >
              Risk Ranking & Performance
            </h3>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "bold",
              }}
            >
              Ordenado por nivel de riesgo de lesión (ACWR)
            </p>
          </div>
          <button className="btn-text" style={{ fontSize: "12px" }}>
            Exportar Reporte
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #f1f5f9",
                  background: "#ffffff",
                }}
              >
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Atleta
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Estado Riesgo
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  ACWR
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Score (7d)
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Insights
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  Actividad
                </th>
                <th style={{ padding: "16px 24px" }}></th>
              </tr>
            </thead>
            <tbody>
              {roster?.map((athlete: any) => (
                <tr
                  key={athlete.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fcfdff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "16px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "900",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        {athlete.name.charAt(0)}
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            fontWeight: "900",
                            color: "#0f172a",
                          }}
                        >
                          {athlete.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "11px",
                            color: "#64748b",
                            fontWeight: "bold",
                          }}
                        >
                          {athlete.level}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: "900",
                        background: `${getRiskColor(athlete.riskLevel)}15`,
                        color: getRiskColor(athlete.riskLevel),
                        border: `1px solid ${getRiskColor(
                          athlete.riskLevel,
                        )}33`,
                      }}
                    >
                      {athlete.riskLevel}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontWeight: "900",
                      color: "#0f172a",
                      fontSize: "14px",
                    }}
                  >
                    {athlete.acwr ? athlete.acwr.toFixed(2) : "--"}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "4px",
                          background: "#f1f5f9",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${athlete.avgScore7d}%`,
                            height: "100%",
                            background:
                              athlete.avgScore7d > 80 ? "#10b981" : "#f59e0b",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: "900" }}>
                        {athlete.avgScore7d}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    {athlete.unreadInsightsCount > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color:
                            athlete.highestSeverity === "HIGH"
                              ? "#ef4444"
                              : "#f59e0b",
                        }}
                      >
                        <Activity size={14} />
                        <span style={{ fontSize: "12px", fontWeight: "900" }}>
                          {athlete.unreadInsightsCount} Activos
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        Sin alertas
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "bold",
                    }}
                  >
                    {athlete.lastWorkout
                      ? new Date(athlete.lastWorkout).toLocaleDateString()
                      : "Nunca"}
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <button
                      style={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "900",
                        color: "#0f172a",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Gestionar <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
