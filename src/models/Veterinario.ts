import { Schema, model } from 'mongoose';

const veterinarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria'],
        trim: true
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

export const Veterinario = model('Veterinario', veterinarioSchema);
