import { Router } from 'express';
// @ts-ignore
import expressValidator from 'express-validator';
const { body } = expressValidator;
import { obtenerVeterinarios, crearVeterinario, obtenerVeterinario, actualizarVeterinario, eliminarVeterinario } from '../controllers/veterinarioController.js';
import { proteger } from '../middlewares/authMiddleware.js';
import { validarCampos } from '../middlewares/validarMiddleware.js';
const router = Router();
router.use(proteger);
router.route('/')
    .get(obtenerVeterinarios)
    .post([
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    body('dni').notEmpty().withMessage('El DNI es obligatorio'),
    validarCampos
], crearVeterinario);
router.route('/:id')
    .get(obtenerVeterinario)
    .put([
    body('especialidad').optional().notEmpty().withMessage('La especialidad no puede estar vacía'),
    validarCampos
], actualizarVeterinario)
    .delete(eliminarVeterinario);
export default router;
