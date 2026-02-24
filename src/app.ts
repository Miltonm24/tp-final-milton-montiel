import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import duenoRoutes from './routes/duenoRoutes.js';
import mascotaRoutes from './routes/mascotaRoutes.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import historialRoutes from './routes/historialRoutes.js';
import { manejadorErrores } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/duenos', duenoRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/historiales', historialRoutes);

// Rutas de prueba
app.get('/api/saludo', (req: Request, res: Response) => {
    res.json({ mensaje: '¡Hola desde la API de Patitas Felices!' });
});

// Manejador de errores centralizado (DEBE IR AL FINAL)
app.use(manejadorErrores);

export default app;
