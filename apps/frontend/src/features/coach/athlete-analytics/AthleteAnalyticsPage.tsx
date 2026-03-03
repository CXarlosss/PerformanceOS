import React, { useState } from 'react';
import { useAthleteAnalytics } from './hooks/useAthleteAnalytics';
import { WeeklyOverviewCards } from './components/WeeklyOverviewCards';
import { VolumeTrendChart } from './components/VolumeTrendChart';
import { FatigueAreaChart } from './components/FatigueAreaChart';
import { ExerciseProgressChart } from './components/ExerciseProgressChart';
import { AlertPanel } from './components/AlertPanel';
import { WeeklyTableHistory } from './components/WeeklyTableHistory';
import { ChevronLeft, Calendar, FileDown } from 'lucide-react';

interface Props {
    athleteId: string;
    onBack: () => void;
}

export const AthleteAnalyticsPage: React.FC<Props> = ({ athleteId, onBack }) => {
    const [range, setRange] = useState('12w');
    const { data, isLoading } = useAthleteAnalytics(athleteId, range);

    if (isLoading) return (
        <div style={{ padding: '80px', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
            <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.2em', color: '#64748b' }}>SISTEMA DE DIAGNÓSTICO ANALIZANDO HISTÓRICO...</p>
        </div>
    );

    return (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>

            {/* 🧭 NAVIGATION & ACTIONS */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button
                        onClick={onBack}
                        style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease'
                        }}
                    >
                        <ChevronLeft size={20} color="#0f172a" />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Historial Longitudinal</h1>
                        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Atleta ID: <span style={{ fontFamily: 'monospace' }}>{athleteId.substring(0, 8)}...</span></p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                        display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '14px', border: '1px solid #e2e8f0'
                    }}>
                        {['4w', '8w', '12w', 'all'].map(r => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                style={{
                                    padding: '8px 16px', borderRadius: '10px', border: 'none', fontSize: '11px', fontWeight: '900',
                                    background: range === r ? 'white' : 'transparent', color: range === r ? 'var(--primary)' : '#64748b',
                                    boxShadow: range === r ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', textTransform: 'uppercase'
                                }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <button style={{
                        display: 'flex', gap: '8px', alignItems: 'center', padding: '10px 20px', background: '#0f172a',
                        color: 'white', border: 'none', borderRadius: '14px', fontSize: '11px', fontWeight: '900', cursor: 'pointer'
                    }}>
                        <FileDown size={14} /> EXPORTAR PDF
                    </button>
                </div>
            </header>

            {/* 📊 DASHBOARD GRID */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* ROW 1: KPI CARDS */}
                <WeeklyOverviewCards
                    metrics={data?.weeklyMetrics}
                    trend={data?.trendAnalysis}
                    alerts={data?.alerts}
                />

                {/* ROW 2: PRIMARY CHARTS + ALERTS */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: '32px', alignItems: 'start' }}>
                    <VolumeTrendChart data={data?.weeklyMetrics} />
                    <FatigueAreaChart data={data?.weeklyMetrics} />
                    <AlertPanel alerts={data?.alerts} />
                </div>

                {/* ROW 3: EXERCISE SPECIFIC PROGRESS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: '32px' }}>
                    <ExerciseProgressChart exerciseData={data?.exerciseProgress} />
                    <WeeklyTableHistory metrics={data?.weeklyMetrics} />
                </div>

            </div>

            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};
