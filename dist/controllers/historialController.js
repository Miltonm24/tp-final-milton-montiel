import { HistorialClinico } from '../models/HistorialClinico.js';
export const obtenerHistoriales = async (req, res, next) => {
    try {
        const historiales = await HistorialClinico.find()
            .populate('mascota')
            .populate('veterinario');
        res.status(200).json({ status: 'success', data: { historiales } });
    }
    catch (error) {
        next(error);
    }
};
export const crearHistorial = async (req, res, next) => {
    try {
        const { mascota, veterinario, diagnostico, tratamiento } = req.body;
        const historial = await HistorialClinico.create({ mascota, veterinario, diagnostico, tratamiento });
        res.status(201).json({ status: 'success', data: { historial } });
    }
    catch (error) {
        next(error);
    }
};
export const obtenerHistorial = async (req, res, next) => {
    try {
        const historial = await HistorialClinico.findById(req.params.id)
            .populate('mascota')
            .populate('veterinario');
        if (!historial) {
            return res.status(404).json({ mensaje: 'Historial no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { historial } });
    }
    catch (error) {
        next(error);
    }
};
export const actualizarHistorial = async (req, res, next) => {
    try {
        const historial = await HistorialClinico.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!historial) {
            return res.status(404).json({ mensaje: 'Historial no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { historial } });
    }
    catch (error) {
        next(error);
    }
};
export const eliminarHistorial = async (req, res, next) => {
    try {
        const historial = await HistorialClinico.findByIdAndDelete(req.params.id);
        if (!historial) {
            return res.status(404).json({ mensaje: 'Historial no encontrado' });
        }
        res.status(204).json({ status: 'success', data: null });
    }
    catch (error) {
        next(error);
    }
};
