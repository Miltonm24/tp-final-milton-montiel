import { Request, Response, NextFunction } from 'express';

export const manejadorErrores = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    console.error('ERROR 💥:', err);

    res.status(statusCode).json({
        status: status,
        mensaje: err.message || 'Algo salió mal en el servidor',
        // Opcional: stack trace solo en desarrollo
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
