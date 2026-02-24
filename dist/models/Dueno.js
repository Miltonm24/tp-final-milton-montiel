import { Schema, model } from 'mongoose';
const duenoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    }
}, {
    timestamps: true
});
export const Dueno = model('Dueno', duenoSchema);
