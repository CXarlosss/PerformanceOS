import React from 'react';

interface Props {
    metrics: any[];
}

export const WeeklyTableHistory: React.FC<Props> = ({ metrics }) => {
    return (
        <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em' }}>REGISTRO HISTÓRICO SEMANAL</h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Análisis técnico de progresión longitudinal</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>SEM</th>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>VOLUMEN</th>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Δ %</th>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>FATIGA</th>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>SCORE</th>
                            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>PRs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map((m, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>W{m.week}</td>
                                <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 'bold' }}>{m.volume.toLocaleString()}Kg</td>
                                <td style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 'bold', color: m.volumeDelta > 0 ? '#22c55e' : m.volumeDelta < 0 ? '#ef4444' : '#64748b' }}>
                                    {m.volumeDelta > 0 ? '+' : ''}{m.volumeDelta.toFixed(1)}%
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{Math.round(m.fatigue).toLocaleString()}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '32px', height: '4px', borderRadius: '4px', background: '#f1f5f9' }}>
                                            <div style={{ width: `${m.performanceScore}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{Math.round(m.performanceScore)}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'center' }}>
                                    {m.prs > 0 ? (
                                        <span style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#d97706', padding: '2px 8px', borderRadius: '6px', fontWeight: '900', fontSize: '10px' }}>
                                            {m.prs} PR
                                        </span>
                                    ) : <span style={{ color: '#cbd5e1' }}>-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
