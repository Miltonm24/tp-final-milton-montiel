import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6,
        select: false
    },
    rol: {
        type: String,
        enum: ['admin', 'veterinario', 'recepcionista', 'cliente'],
        default: 'cliente'
    }
}, {
    timestamps: true
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (this: any) {
    if (!this.isModified('contrasena')) return;
    this.contrasena = await bcrypt.hash(this.contrasena, 12);
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = async function (contrasenaCandidata: string): Promise<boolean> {
    return await bcrypt.compare(contrasenaCandidata, (this as any).contrasena);
};

export const Usuario = model('Usuario', usuarioSchema);
