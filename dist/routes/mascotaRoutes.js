import { Router } from 'express';
// @ts-ignore
import expressValidator from 'express-validator';
const { body } = expressValidator;
import { obtenerMascotas, crearMascota, obtenerMascota, actualizarMascota, eliminarMascota } from '../controllers/mascotaController.js';
import { proteger } from '../middlewares/authMiddleware.js';
import { validarCampos } from '../middlewares/validarMiddleware.js';
const router = Router();
router.use(proteger);
router.route('/')
    .get(obtenerMascotas)
    .post([
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('especie').notEmpty().withMessage('La especie es obligatoria'),
    body('edad').isNumeric().withMessage('La edad debe ser un número'),
    body('duenoId').isMongoId().withMessage('ID de dueño inválido'),
    validarCampos
], crearMascota);
router.route('/:id')
    .get(obtenerMascota)
    .put([
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('edad').optional().isNumeric().withMessage('La edad debe ser un número'),
    validarCampos
], actualizarMascota)
    .delete(eliminarMascota);
export default router;
