export interface CreateDuenoDTO {
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
}

export interface UpdateDuenoDTO {
    nombre?: string;
    apellido?: string;
    dni?: string;
    telefono?: string;
}
