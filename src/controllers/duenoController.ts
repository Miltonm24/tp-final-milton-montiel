import { Request, Response, NextFunction } from 'express';
import { Dueno } from '../models/Dueno.js';
import { CreateDuenoDTO, UpdateDuenoDTO } from '../dtos/dueno.dto.js';

export const obtenerDuenos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const duenos = await Dueno.find();
        res.status(200).json({ status: 'success', data: { duenos } });
    } catch (error) {
        next(error);
    }
};

export const crearDueno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, apellido, dni, telefono }: CreateDuenoDTO = req.body;

        const duenoExistente = await Dueno.findOne({ dni });
        if (duenoExistente) {
            return res.status(400).json({ mensaje: 'Ya existe un dueño con ese DNI' });
        }

        const nuevoDueno = await Dueno.create({ nombre, apellido, dni, telefono });
        res.status(201).json({ status: 'success', data: { dueno: nuevoDueno } });
    } catch (error) {
        next(error);
    }
};

export const obtenerDueno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dueno = await Dueno.findById(req.params.id);
        if (!dueno) {
            return res.status(404).json({ mensaje: 'Dueño no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { dueno } });
    } catch (error) {
        next(error);
    }
};

export const actualizarDueno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const datosActualizar: UpdateDuenoDTO = req.body;
        const dueno = await Dueno.findByIdAndUpdate(req.params.id, datosActualizar, {
            new: true,
            runValidators: true
        });
        if (!dueno) {
            return res.status(404).json({ mensaje: 'Dueño no encontrado' });
        }
        res.status(200).json({ status: 'success', data: { dueno } });
    } catch (error) {
        next(error);
    }
};

export const eliminarDueno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dueno = await Dueno.findByIdAndDelete(req.params.id);
        if (!dueno) {
            return res.status(404).json({ mensaje: 'Dueño no encontrado' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};
