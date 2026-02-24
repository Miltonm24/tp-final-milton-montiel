import { Router } from 'express';
// @ts-ignore
import expressValidator from 'express-validator';
const { body } = expressValidator;
import { obtenerDuenos, crearDueno, obtenerDueno, actualizarDueno, eliminarDueno } from '../controllers/duenoController.js';
import { proteger } from '../middlewares/authMiddleware.js';
import { validarCampos } from '../middlewares/validarMiddleware.js';

const router = Router();

router.use(proteger);

router.route('/')
    .get(obtenerDuenos)
    .post(
        [
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
            body('dni').notEmpty().withMessage('El DNI es obligatorio'),
            body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
            validarCampos
        ],
        crearDueno
    );

router.route('/:id')
    .get(obtenerDueno)
    .put(
        [
            body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
            body('telefono').optional().notEmpty().withMessage('El teléfono no puede estar vacío'),
            validarCampos
        ],
        actualizarDueno
    )
    .delete(eliminarDueno);

export default router;
