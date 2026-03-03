import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Props {
    alerts: any;
}

export const AlertPanel: React.FC<Props> = ({ alerts }) => {
    const stagnationCount = alerts.stagnationExercises?.length || 0;

    return (
        <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em' }}>DIAGNÓSTICO IA ATHLETE</h3>
                    <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Análisis automático de riesgos y mesetas</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                    <Activity size={20} color="#6366f1" />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* SOBRECARGA */}
                <div style={{
                    display: 'flex', gap: '16px', padding: '16px', borderRadius: '16px',
                    background: alerts.overloadRisk ? 'rgba(239, 68, 68, 0.05)' : 'rgba(34, 197, 94, 0.05)',
                    border: alerts.overloadRisk ? '1px solid #ef4444' : '1px solid #22c55e'
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: alerts.overloadRisk ? '#ef4444' : '#22c55e',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                        {alerts.overloadRisk ? <AlertTriangle size={16} color="white" /> : <CheckCircle size={16} color="white" />}
                    </div>
                    <div>
                        <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '900', color: alerts.overloadRisk ? '#ef4444' : '#22c55e' }}>
                            {alerts.overloadRisk ? 'RIESGO DE LESIÓN/SOBRECARGA' : 'PROGRESIÓN SEGURA'}
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                            {alerts.overloadRisk ? 'Se ha detectado un pico de volumen >15% con fatiga elevada. Considerar descarga.' : 'El sistema de carga actual está dentro de los umbrales de seguridad.'}
                        </p>
                    </div>
                </div>

                {/* ESTANCAMIENTO */}
                <div style={{
                    display: 'flex', gap: '16px', padding: '16px', borderRadius: '16px',
                    background: stagnationCount > 0 ? 'rgba(245, 158, 11, 0.05)' : 'rgba(34, 197, 94, 0.05)',
                    border: stagnationCount > 0 ? '1px solid #f59e0b' : '1px solid #22c55e'
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: stagnationCount > 0 ? '#f59e0b' : '#22c55e',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                        {stagnationCount > 0 ? <AlertCircle size={16} color="white" /> : <CheckCircle size={16} color="white" />}
                    </div>
                    <div>
                        <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '900', color: stagnationCount > 0 ? '#f59e0b' : '#22c55e' }}>
                            {stagnationCount > 0 ? 'MESETAS DETECTADAS' : 'EVOLUCIÓN CONSTANTE'}
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                            {stagnationCount > 0 ? `Atención: ${alerts.stagnationExercises.join(', ')} sin mejora en 4 semanas.` : 'Todos los ejercicios principales muestran tendencia positiva.'}
                        </p>
                    </div>
                </div>

                {/* INFO */}
                <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Info size={16} color="#94a3b8" style={{ marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
                        Este diagnóstico se actualiza automáticamente con cada registro del atleta usando el motor Core PerformanceOS.
                    </p>
                </div>
            </div>
        </div>
    );
};
import { Activity } from 'lucide-react';
