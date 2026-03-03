import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface Props {
    exerciseData: Record<string, any[]>;
}

export const ExerciseProgressChart: React.FC<Props> = ({ exerciseData }) => {
    const exercises = Object.keys(exerciseData);
    const [selectedExercise, setSelectedExercise] = useState(exercises[0] || '');

    if (exercises.length === 0) return null;

    const data = exerciseData[selectedExercise] || [];

    return (
        <div className="card" style={{ padding: '24px', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em' }}>PROGRESIÓN POR EJERCICIO (E1RM)</h3>
                    <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Análisis longitudinal de fuerza específica</p>
                </div>
                <select
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: '2px solid #f1f5f9',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        background: 'white',
                        outline: 'none',
                        color: '#1e293b'
                    }}
                >
                    {exercises.map(ex => <option key={ex} value={ex}>{ex.toUpperCase()}</option>)}
                </select>
            </div>

            <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', borderRadius: '12px', borderColor: 'transparent' }}
                            labelStyle={{ color: 'white', fontWeight: 'bold' }}
                            itemStyle={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="estimated1RM"
                            stroke="var(--primary)"
                            strokeWidth={4}
                            dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'white' }}
                            activeDot={{ r: 8, strokeWidth: 0 }}
                            name="1RM Estimado (Kg)"
                        />
                        <Line
                            type="monotone"
                            dataKey="volume"
                            stroke="#6366f1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            name="Volumen (Total)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
