import { Router } from 'express';
// @ts-ignore
import expressValidator from 'express-validator';
const { body } = expressValidator;
import { obtenerHistoriales, crearHistorial, obtenerHistorial, actualizarHistorial, eliminarHistorial } from '../controllers/historialController.js';
import { proteger } from '../middlewares/authMiddleware.js';
import { validarCampos } from '../middlewares/validarMiddleware.js';

const router = Router();

router.use(proteger);

router.route('/')
    .get(obtenerHistoriales)
    .post(
        [
            body('mascota').isMongoId().withMessage('ID de mascota inválido'),
            body('veterinario').isMongoId().withMessage('ID de veterinario inválido'),
            body('diagnostico').notEmpty().withMessage('El diagnóstico es obligatorio'),
            validarCampos
        ],
        crearHistorial
    );

router.route('/:id')
    .get(obtenerHistorial)
    .put(
        [
            body('diagnostico').optional().notEmpty().withMessage('El diagnóstico no puede estar vacío'),
            validarCampos
        ],
        actualizarHistorial
    )
    .delete(eliminarHistorial);

export default router;
