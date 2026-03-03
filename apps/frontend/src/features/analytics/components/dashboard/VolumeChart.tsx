import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface VolumeChartProps {
  data: { weekStart: string; total: number }[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const formattedData = data.map((d) => ({
    ...d,
    dateLabel: new Date(d.weekStart).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    }),
  }));

  return (
    <div className="card" style={{ padding: "24px" }}>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "900",
          marginBottom: "24px",
          letterSpacing: "-0.02em",
        }}
      >
        Carga de Volumen Semanal
      </h2>
      <div style={{ height: "240px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="dateLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: "bold" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: "bold" }}
            />
            <Tooltip
              contentStyle={{
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              labelStyle={{ color: "#64748b" }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="var(--primary)"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "var(--primary)",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
