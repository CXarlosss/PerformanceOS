import React from 'react';
import { TemplateBuilderProvider, useTemplateBuilder } from './context/TemplateBuilderContext';
import { MicrocycleColumn } from './components/MicrocycleColumn';
import { useCreateTemplate } from '../hooks/useCoachData';

const BuilderContent: React.FC = () => {
    const { template, updateMetadata, addMicrocycle } = useTemplateBuilder();
    const { mutateAsync: saveTemplate, isPending: saving } = useCreateTemplate();

    const handleSave = async () => {
        const payload = {
            title: template.title,
            description: template.description,
            durationWeeks: template.microcycles.length,
            microcycles: template.microcycles.map((m, microIndex) => ({
                name: m.name,
                order: microIndex + 1,
                sessions: m.sessions.map((s) => ({
                    title: s.title,
                    blocks: s.blocks.map((b) => ({
                        type: b.type,
                        exercises: b.exercises.map((e) => ({
                            name: e.name,
                            targetSets: e.targetSets,
                            targetReps: e.targetReps,
                            targetRpe: e.targetRpe
                        }))
                    }))
                }))
            }))
        };

        try {
            await saveTemplate(payload);
            alert('Plantilla guardada con éxito 🚀');
        } catch (err: any) {
            console.error('Error al guardar plantilla:', err);
            alert('Error al guardar: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ background: '#f1f5f9', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            {/* 🛡️ BUILDER NAVIGATION / METADATA */}
            <header style={{
                background: 'white',
                borderBottom: '1px solid #e2e8f0',
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 5
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', background: '#f8fafc', padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <input
                            value={template.title}
                            onChange={(e) => updateMetadata(e.target.value, template.description, template.durationWeeks)}
                            placeholder="Nombre de la planificación..."
                            style={{ background: 'transparent', border: 'none', fontWeight: '800', fontSize: '15px', outline: 'none', width: '240px', color: '#0f172a' }}
                        />
                        <div style={{ width: '1px', background: '#cbd5e1' }} />
                        <span style={{ fontSize: '12px', fontWeight: '900', color: 'var(--primary)', alignSelf: 'center' }}>
                            {template.microcycles.length} FASES PENDIENTES
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={handleSave}
                        className="btn-primary"
                        style={{ padding: '12px 32px', height: 'auto', background: '#0f172a', color: 'white' }}
                        disabled={saving}
                    >
                        {saving ? 'PUBLICANDO...' : 'GUARDAR PLANTILLA PRO'}
                    </button>
                </div>
            </header>

            {/* 🏗️ BUILDER CANVAS */}
            <main style={{
                flex: 1,
                display: 'flex',
                gap: '24px',
                padding: '40px',
                overflowX: 'auto',
                alignItems: 'flex-start',
                scrollBehavior: 'smooth'
            }}>
                {template.microcycles.map(m => (
                    <MicrocycleColumn key={m.id} microcycle={m} />
                ))}

                <button
                    onClick={addMicrocycle}
                    style={{
                        minWidth: '320px',
                        height: '200px',
                        background: 'rgba(255,255,255,0.4)',
                        border: '2px dashed #cbd5e1',
                        borderRadius: '32px',
                        color: '#94a3b8',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <span style={{ fontSize: '24px' }}>+</span>
                    AÑADIR SEMANA DE CARGA
                </button>
            </main>
        </div>
    );
}

export const TemplateBuilderPage: React.FC = () => (
    <TemplateBuilderProvider>
        <BuilderContent />
    </TemplateBuilderProvider>
);
