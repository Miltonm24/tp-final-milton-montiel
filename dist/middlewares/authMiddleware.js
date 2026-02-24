import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';
export const proteger = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ mensaje: 'No has iniciado sesión. Por favor, inicia sesión para acceder.' });
        }
        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        // Verificar si el usuario todavía existe
        const usuarioActual = await Usuario.findById(decoded.id);
        if (!usuarioActual) {
            return res.status(401).json({ mensaje: 'El usuario perteneciente a este token ya no existe.' });
        }
        // Conceder acceso a la ruta protegida
        req.usuario = usuarioActual;
        next();
    }
    catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};
