export interface Cliente {
    id: string;
    nombre: string;
    nivel: 'Pipi' | 'Intermedio' | 'Avanzado';
    tipoAtleta: 'Híbrido' | 'Fuerza' | 'Estética' | 'Rendimiento';
}

export const T_Clientes: Cliente[] = [
    { id: 'C001', nombre: 'Oscar', nivel: 'Intermedio', tipoAtleta: 'Híbrido' },
    { id: 'C002', nombre: 'Marta', nivel: 'Avanzado', tipoAtleta: 'Fuerza' },
];
