export type IntensityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ObjectiveConfig {
    id: string;
    name: string;
    weeklyVolumeRange: [number, number];
    intensityTarget: IntensityLevel;
    tolerance: number;
    description: string;
}

export const T_Objetivos: Record<string, ObjectiveConfig> = {
    PERF: {
        id: 'PERF',
        name: 'Performance',
        weeklyVolumeRange: [12, 16],
        intensityTarget: 'MEDIUM',
        tolerance: 0.10,
        description: 'Optimización general de todas las capacidades físicas.',
    },
    FUER: {
        id: 'FUER',
        name: 'Fuerza',
        weeklyVolumeRange: [8, 12],
        intensityTarget: 'HIGH',
        tolerance: 0.05,
        description: 'Enfoque en intensidad y PRs. Prioridad en carga total.',
    },
    VOL: {
        id: 'VOL',
        name: 'Hipertrofia',
        weeklyVolumeRange: [14, 20],
        intensityTarget: 'MEDIUM',
        tolerance: 0.12,
        description: 'Enfoque en volumen y acumulación. Prioridad en estrés metabólico.',
    },
    DEF: {
        id: 'DEF',
        name: 'Definición técnica',
        weeklyVolumeRange: [10, 14],
        intensityTarget: 'MEDIUM',
        tolerance: 0.08,
        description: 'Mantenimiento de masa muscular y enfoque técnico.',
    },
};

export const LISTA_OBJETIVOS = Object.values(T_Objetivos);
