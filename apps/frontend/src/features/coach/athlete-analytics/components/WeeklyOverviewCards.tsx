import React from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
    metrics: any;
    trend: any;
    alerts: any;
}

export const WeeklyOverviewCards: React.FC<Props> = ({ metrics, trend, alerts }) => {
    if (!metrics) return null;

    const current = metrics[metrics.length - 1];

    const cards = [
        {
            title: 'RENDIMIENTO CIERRE',
            value: `${Math.round(current?.performanceScore || 0)}%`,
            sub: trend.scoreTrend,
            icon: <Activity size={20} color="var(--primary)" />,
            trend: trend.scoreTrend === 'ASCENDING' ? 'up' : 'down'
        },
        {
            title: 'VOLUMEN SEMANAL',
            value: `${(current?.volume / 1000).toFixed(1)}k`,
            sub: `${current?.volumeDelta?.toFixed(1)}% Δ`,
            icon: <Zap size={20} color="#6366f1" />,
            trend: current?.volumeDelta > 0 ? 'up' : 'down'
        },
        {
            title: 'FATIGA ESTIMADA',
            value: Math.round(current?.fatigue).toLocaleString(),
            sub: trend.fatigueTrend,
            icon: <AlertTriangle size={20} color="#f59e0b" />,
            trend: trend.fatigueTrend === 'ASCENDING' ? 'down' : 'up' // Up is bad for fatigue usually
        },
        {
            title: 'Riesgo Carga',
            value: alerts.overloadRisk ? 'ALTO' : 'ÓPTIMO',
            sub: alerts.overloadRisk ? 'Acción Requerida' : 'Progresión Segura',
            icon: alerts.overloadRisk ? <TrendingUp size={20} color="#ef4444" /> : <CheckCircle size={20} color="#22c55e" />,
            status: alerts.overloadRisk ? 'crit' : 'ok'
        }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
            {cards.map((card, i) => (
                <div key={i} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.1em' }}>{card.title}</span>
                        <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '10px' }}>{card.icon}</div>
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>{card.value}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {card.trend === 'up' ? <TrendingUp size={14} color="#22c55e" /> : <TrendingDown size={14} color="#ef4444" />}
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: card.trend === 'up' ? '#22c55e' : '#ef4444' }}>{card.sub}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
