import { Request, Response, NextFunction } from 'express';
import expressValidator from 'express-validator';
const { validationResult } = expressValidator;

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errores: errores.array().map((err: any) => ({
                campo: err.path,
                mensaje: err.msg
            }))
        });
    }
    next();
};
