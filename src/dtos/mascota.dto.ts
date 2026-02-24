export interface CreateMascotaDTO {
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    duenoId: string;
}

export interface UpdateMascotaDTO {
    nombre?: string;
    especie?: string;
    raza?: string;
    edad?: number;
    duenoId?: string;
}
