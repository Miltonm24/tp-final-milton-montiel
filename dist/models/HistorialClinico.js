import { Schema, model } from 'mongoose';
const historialClinicoSchema = new Schema({
    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota',
        required: [true, 'La mascota es obligatoria']
    },
    veterinario: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinario',
        required: [true, 'El veterinario es obligatorio']
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    diagnostico: {
        type: String,
        required: [true, 'El diagnóstico es obligatorio'],
        trim: true
    },
    tratamiento: {
        type: String,
        required: [true, 'El tratamiento es obligatorio'],
        trim: true
    }
}, {
    timestamps: true
});
export const HistorialClinico = model('HistorialClinico', historialClinicoSchema);
