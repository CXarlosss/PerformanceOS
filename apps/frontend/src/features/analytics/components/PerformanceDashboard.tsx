import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  useAthleteDashboard,
  useInsights,
} from "../../training/hooks/useTrainingData";
import { PerformanceCard } from "./dashboard/PerformanceCard";
import { RiskBadge } from "./dashboard/RiskBadge";
import { ACWRGauge } from "./dashboard/ACWRGauge";
import { VolumeChart } from "./dashboard/VolumeChart";
import { FatigueChart } from "./dashboard/FatigueChart";
import { RecentPRsCard } from "./dashboard/RecentPRsCard";
import { AICoachPanel } from "./dashboard/AICoachPanel";

export const PerformanceDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: dashboard, isLoading: isLoadingDashboard } =
    useAthleteDashboard(user?.athleteId);
  const { data: insights, isLoading: isLoadingInsights } = useInsights(
    user?.athleteId,
  );

  const isLoading = isLoadingDashboard || isLoadingInsights;

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            height: "100px",
            background: "#e2e8f0",
            borderRadius: "24px",
            animation: "pulse 1.5s infinite",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div
            style={{
              height: "140px",
              background: "#e2e8f0",
              borderRadius: "24px",
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              height: "140px",
              background: "#e2e8f0",
              borderRadius: "24px",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
        <div
          style={{
            height: "300px",
            background: "#e2e8f0",
            borderRadius: "24px",
            animation: "pulse 1.5s infinite",
          }}
        />
        <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* AI COACH PANEL (TOP PRIORITY) */}
      <AICoachPanel insights={insights || []} />

      {/* TOP STATS */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <PerformanceCard score={dashboard.avgPerformanceScore} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <RiskBadge level={dashboard.riskLevel} />
          <ACWRGauge value={dashboard.acwr} />
        </div>
      </div>

      {/* CHARTS */}
      <VolumeChart data={dashboard.weeklyVolume} />
      <FatigueChart data={dashboard.weeklyFatigue} />

      {/* ACHIEVEMENTS */}
      <RecentPRsCard prs={dashboard.recentPRs} />
    </div>
  );
};
