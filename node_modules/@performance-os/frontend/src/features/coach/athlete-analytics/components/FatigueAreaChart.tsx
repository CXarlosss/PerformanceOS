import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
    data: any[];
}

export const FatigueAreaChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em' }}>ÍNDICE DE FATIGA CRÓNICA</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Análisis de carga relativa y recuperación</p>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="fatigueColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', borderRadius: '12px', borderColor: 'transparent' }}
                            labelStyle={{ color: 'white', fontWeight: 'bold' }}
                            itemStyle={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="fatigue"
                            stroke="#d97706"
                            fillOpacity={1}
                            fill="url(#fatigueColor)"
                            name="Fatiga Estimada"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
