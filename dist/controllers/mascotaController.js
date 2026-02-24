import { Mascota } from '../models/Mascota.js';
import { Dueno } from '../models/Dueno.js';
export const obtenerMascotas = async (req, res, next) => {
    try {
        const mascotas = await Mascota.find().populate('dueno');
        res.status(200).json({ status: 'success', data: { mascotas } });
    }
    catch (error) {
        next(error);
    }
};
export const crearMascota = async (req, res, next) => {
    try {
        const { nombre, especie, raza, edad, duenoId } = req.body;
        const dueno = await Dueno.findById(duenoId);
        if (!dueno) {
            return res.status(404).json({ mensaje: 'Dueño no encontrado' });
        }
        const nuevaMascota = await Mascota.create({
            nombre,
            especie,
            raza,
            edad,
            dueno: duenoId
        });
        res.status(201).json({ status: 'success', data: { mascota: nuevaMascota } });
    }
    catch (error) {
        next(error);
    }
};
export const obtenerMascota = async (req, res, next) => {
    try {
        const mascota = await Mascota.findById(req.params.id).populate('dueno');
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
        res.status(200).json({ status: 'success', data: { mascota } });
    }
    catch (error) {
        next(error);
    }
};
export const actualizarMascota = async (req, res, next) => {
    try {
        const datosActualizar = req.body;
        const mascota = await Mascota.findByIdAndUpdate(req.params.id, datosActualizar, {
            new: true,
            runValidators: true
        });
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
        res.status(200).json({ status: 'success', data: { mascota } });
    }
    catch (error) {
        next(error);
    }
};
export const eliminarMascota = async (req, res, next) => {
    try {
        const mascota = await Mascota.findByIdAndDelete(req.params.id);
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
        res.status(204).json({ status: 'success', data: null });
    }
    catch (error) {
        next(error);
    }
};
