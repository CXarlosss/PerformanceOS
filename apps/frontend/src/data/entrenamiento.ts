export interface Serie {
    reps: number;
    peso: number;
    rpe: number;
    descanso: number; // en segundos
}

export interface Ejercicio {
    id: string;
    nombre: string;
    categoria: 'Empuje' | 'Tracción' | 'Pierna' | 'Core' | 'Accesorio';
    series: Serie[];
    notas?: string;
}

export interface SesionEntrenamiento {
    id: string;
    clienteId: string;
    fecha: string; // ISO format
    nombreSesion: string;
    objetivoPrincipal: string; // Ref a T_Objetivos
    ejercicios: Ejercicio[];
    fatigaPercibida: number; // 1-10
}

// Datos de ejemplo para inicializar el motor en Fase 2
export const T_Entreno: SesionEntrenamiento[] = [
    {
        id: 'S001',
        clienteId: 'C001',
        fecha: new Date().toISOString(),
        nombreSesion: 'Fullbody A - Fuerza',
        objetivoPrincipal: 'FUER',
        fatigaPercibida: 4,
        ejercicios: [
            {
                id: 'E001',
                nombre: 'Sentadilla con Barra',
                categoria: 'Pierna',
                series: [
                    { reps: 5, peso: 100, rpe: 8, descanso: 180 },
                    { reps: 5, peso: 100, rpe: 8, descanso: 180 },
                    { reps: 5, peso: 100, rpe: 9, descanso: 180 },
                ],
            },
            {
                id: 'E002',
                nombre: 'Press de Banca',
                categoria: 'Empuje',
                series: [
                    { reps: 5, peso: 80, rpe: 7, descanso: 150 },
                    { reps: 5, peso: 80, rpe: 8, descanso: 150 },
                    { reps: 5, peso: 80, rpe: 8.5, descanso: 150 },
                ],
            }
        ]
    }
];
