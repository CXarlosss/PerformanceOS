import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
    data: any[];
}

export const VolumeTrendChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em' }}>TENDENCIA DE VOLUMEN (PRO)</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Análisis de carga semanal acumulada</p>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                            label={{ value: 'Semana de Entrenamiento', position: 'bottom', offset: -5, fontSize: 10, fill: '#cbd5e1' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', borderRadius: '12px', borderColor: 'transparent' }}
                            labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}
                            itemStyle={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold' }}
                            cursor={{ fill: '#f8fafc', radius: 4 }}
                        />
                        <Bar
                            dataKey="volume"
                            fill="var(--primary)"
                            radius={[6, 6, 0, 0]}
                            name="Volumen Semanal"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
