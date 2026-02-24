export interface CreateHistorialDTO {
    mascota: string;
    veterinario: string;
    diagnostico: string;
    tratamiento: string;
}

export interface UpdateHistorialDTO {
    mascota?: string;
    veterinario?: string;
    diagnostico?: string;
    tratamiento?: string;
}
