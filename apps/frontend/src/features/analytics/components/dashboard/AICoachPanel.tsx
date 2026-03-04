import React from "react";
import { AlertCircle, TrendingUp, Zap, Check } from "lucide-react";
import { useMarkInsightRead } from "../../../training/hooks/useTrainingData";

interface Insight {
  id: string;
  type: "OVERLOAD" | "UNDERTRAINING" | "PLATEAU" | "PROGRESSION" | "RISK";
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  message: string;
}

interface AICoachPanelProps {
  insights: Insight[];
}

export const AICoachPanel: React.FC<AICoachPanelProps> = ({ insights }) => {
  const { mutate: markRead } = useMarkInsightRead();

  const severityConfig = {
    HIGH: {
      bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      border: "#f87171",
      icon: <AlertCircle size={20} color="#dc2626" />,
      color: "#991b1b",
    },
    MEDIUM: {
      bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      border: "#fbbf24",
      icon: <Zap size={20} color="#d97706" />,
      color: "#92400e",
    },
    LOW: {
      bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      border: "#60a5fa",
      icon: <TrendingUp size={20} color="#2563eb" />,
      color: "#1e40af",
    },
    OPTIMAL: {
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      border: "#4ade80",
      icon: <Check size={20} color="#16a34a" />,
      color: "#166534",
    },
  };

  if (insights.length === 0) {
    const config = severityConfig.OPTIMAL;
    return (
      <div
        style={{
          padding: "20px 24px",
          background: config.bg,
          border: `1px solid ${config.border}`,
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "10px",
            background: "white",
            borderRadius: "12px",
            display: "flex",
          }}
        >
          {config.icon}
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: "900",
              color: config.color,
            }}
          >
            AI Coach: Zona Óptima
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: config.color,
              opacity: 0.8,
            }}
          >
            Estás en el sweet spot de entrenamiento. Mantén la consistencia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "900",
          margin: "0 0 8px 0",
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Zap size={20} fill="var(--primary)" stroke="var(--primary)" /> AI Coach
        Insights
      </h2>
      {insights.map((insight: Insight) => {
        const config = severityConfig[insight.severity] || severityConfig.LOW;
        return (
          <div
            key={insight.id}
            style={{
              padding: "20px",
              background: config.bg,
              border: `1px solid ${config.border}33`,
              borderRadius: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              <div
                style={{
                  padding: "10px",
                  background: "white",
                  borderRadius: "12px",
                  display: "flex",
                  height: "fit-content",
                }}
              >
                {config.icon}
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: "900",
                    color: config.color,
                  }}
                >
                  {insight.title}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: config.color,
                    opacity: 0.9,
                    lineHeight: "1.4",
                  }}
                >
                  {insight.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => markRead(insight.id)}
              style={{
                background: "white",
                border: "none",
                padding: "8px",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Check size={16} color="#64748b" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
