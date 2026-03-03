import React, { useState, useEffect } from 'react';

interface Props {
    workoutSessionId: string;
    exerciseName: string;
    setNumber: number;
    existingSet?: { id: string; reps: number; load: number; rpe: number; isPR?: boolean };
    onSave: (payload: any) => Promise<void>;
}

export const SetCell: React.FC<Props> = ({ workoutSessionId, exerciseName, setNumber, existingSet, onSave }) => {
    const [reps, setReps] = useState<string>(existingSet?.reps?.toString() || '');
    const [load, setLoad] = useState<string>(existingSet?.load?.toString() || '');
    const [rpe, setRpe] = useState<string>(existingSet?.rpe?.toString() || '');
    const [saving, setSaving] = useState(false);
    const isPR = existingSet?.isPR || false;

    useEffect(() => {
        if (existingSet) {
            setReps(existingSet.reps.toString());
            setLoad(existingSet.load.toString());
            setRpe(existingSet.rpe.toString());
        } else {
            setReps('');
            setLoad('');
            setRpe('');
        }
    }, [existingSet]);

    const handleBlur = async () => {
        const r = parseInt(reps);
        const l = parseFloat(load);
        const rp = parseFloat(rpe);

        if (!isNaN(r) && !isNaN(l) && !isNaN(rp)) {
            if (existingSet && r === existingSet.reps && l === existingSet.load && rp === existingSet.rpe) {
                return;
            }

            setSaving(true);
            try {
                await onSave({
                    workoutSessionId,
                    exerciseName,
                    setNumber,
                    reps: r,
                    load: l,
                    rpe: rp
                });
            } catch (err) {
                console.error('Error al guardar el set:', err);
            } finally {
                setSaving(false);
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '2px',
            padding: '4px',
            background: isPR ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'rgba(248, 250, 252, 0.5)',
            borderRadius: '6px',
            border: isPR ? '1px solid #fbbf24' : '1px solid #e2e8f0',
            boxShadow: isPR ? '0 2px 10px rgba(251, 191, 36, 0.2)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
        }}>
            <input
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                onBlur={handleBlur}
                placeholder="R"
                style={{ width: '24px', fontSize: '12px', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: 'bold', outline: 'none' }}
            />
            <span style={{ fontSize: '10px', color: isPR ? '#92400e' : '#94a3b8', alignSelf: 'center' }}>x</span>
            <input
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                onBlur={handleBlur}
                placeholder="Kg"
                style={{ width: '38px', fontSize: '12px', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: '900', outline: 'none', color: isPR ? '#92400e' : 'inherit' }}
            />
            <span style={{ fontSize: '10px', color: isPR ? '#92400e' : '#94a3b8', alignSelf: 'center' }}>@</span>
            <input
                value={rpe}
                onChange={(e) => setRpe(e.target.value)}
                onBlur={handleBlur}
                placeholder="RP"
                style={{ width: '28px', fontSize: '12px', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: 'bold', outline: 'none' }}
            />

            {saving && (
                <div style={{ position: 'absolute', right: '-4px', top: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid white', animation: 'pulse 1s infinite' }} />
            )}

            {isPR && (
                <div title="NUEVO PR 🎉" style={{ position: 'absolute', top: '-8px', right: '-2px', fontSize: '10px' }}>👑</div>
            )}

            <style>{`
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
            `}</style>
        </div>
    );
};
