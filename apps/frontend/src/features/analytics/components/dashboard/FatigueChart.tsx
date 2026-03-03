import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface FatigueChartProps {
  data: { weekStart: string; total: number }[];
}

export const FatigueChart: React.FC<FatigueChartProps> = ({ data }) => {
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
        Índice de Fatiga Semanal
      </h2>
      <div style={{ height: "240px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorFatigue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorFatigue)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
