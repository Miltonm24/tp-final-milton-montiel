import { Schema, model, Types } from 'mongoose';

const mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la mascota es obligatorio'],
        trim: true
    },
    especie: {
        type: String,
        required: [true, 'La especie es obligatoria'],
        trim: true
    },
    raza: {
        type: String,
        trim: true
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    dueno: {
        type: Schema.Types.ObjectId,
        ref: 'Dueno',
        required: [true, 'El dueño es obligatorio']
    }
}, {
    timestamps: true
});

export const Mascota = model('Mascota', mascotaSchema);
