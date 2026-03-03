import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ACWRGaugeProps {
  value: number | null;
}

export const ACWRGauge: React.FC<ACWRGaugeProps> = ({ value }) => {
  const displayValue = value ?? 0;

  // ACWR Zones: <0.8 (Undertraining), 0.8-1.3 (Optimal), 1.3-1.5 (Overreach), >1.5 (High Risk)
  const data = [
    { value: 0.8, color: "#3b82f6" }, // Blue
    { value: 0.5, color: "#22c55e" }, // Green (0.8 to 1.3)
    { value: 0.2, color: "#eab308" }, // Yellow (1.3 to 1.5)
    { value: 0.5, color: "#ef4444" }, // Red (>1.5)
  ];

  // Map value to needle angle (assuming gauge is 180 degrees)
  const angle = (Math.min(displayValue, 2) / 2) * 180;

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: "900",
          color: "#64748b",
          letterSpacing: "0.1em",
          marginBottom: "8px",
        }}
      >
        ACWR (CARGA)
      </span>
      <div style={{ width: "100%", height: "100px", position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            left: "50%",
            width: "2px",
            height: "60px",
            background: "#0f172a",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${angle - 90}deg)`,
            transition: "transform 1s ease-out",
            zIndex: 10,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "50%",
            width: "8px",
            height: "8px",
            background: "#0f172a",
            borderRadius: "50%",
            transform: "translateX(-50%)",
            zIndex: 11,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%) translateY(5px)",
            textAlign: "center",
          }}
        >
          <span
            style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}
          >
            {displayValue.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
