export interface CreateVeterinarioDTO {
    nombre: string;
    especialidad: string;
    dni: string;
}

export interface UpdateVeterinarioDTO {
    nombre?: string;
    especialidad?: string;
    dni?: string;
}
