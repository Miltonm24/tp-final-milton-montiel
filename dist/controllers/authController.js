import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secreto', {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
};
export const registrar = async (req, res, next) => {
    try {
        const { correo, contrasena, rol } = req.body;
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }
        const nuevoUsuario = await Usuario.create({ correo, contrasena, rol });
        const token = generarToken(nuevoUsuario._id.toString());
        res.status(201).json({
            status: 'success',
            token,
            data: { usuario: { id: nuevoUsuario._id, correo: nuevoUsuario.correo, rol: nuevoUsuario.rol } }
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor proporcione correo y contraseña' });
        }
        const usuario = await Usuario.findOne({ correo }).select('+contrasena');
        if (!usuario || !(await usuario.compararContrasena(contrasena, usuario.contrasena))) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }
        const token = generarToken(usuario._id.toString());
        res.status(200).json({
            status: 'success',
            token,
            data: { usuario: { id: usuario._id, correo: usuario.correo, rol: usuario.rol } }
        });
    }
    catch (error) {
        next(error);
    }
};
