import { Request, Response, NextFunction } from 'express';
import { Veterinario } from '../models/Veterinario.js';

export const obtenerVeterinarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veterinarios = await Veterinario.find();
        res.status(200).json({ status: 'success', data: { veterinarios } });
    } catch (error) {
        next(error);
    }
};

export const crearVeterinario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, especialidad, dni } = req.body;
        const veterinario = await Veterinario.create({ nombre, especialidad, dni });
        res.status(201).json({ status: 'success', data: { veterinario } });
    } catch (error) {
        next(error);
    }
};

export const obtenerVeterinario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veterinario = await Veterinario.findById(req.params.id);
        if (!veterinario) {
            return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { veterinario } });
    } catch (error) {
        next(error);
    }
};

export const actualizarVeterinario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veterinario = await Veterinario.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!veterinario) {
            return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { veterinario } });
    } catch (error) {
        next(error);
    }
};

export const eliminarVeterinario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veterinario = await Veterinario.findByIdAndDelete(req.params.id);
        if (!veterinario) {
            return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};
