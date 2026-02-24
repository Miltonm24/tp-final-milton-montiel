import { Router } from 'express';
// @ts-ignore
import expressValidator from 'express-validator';
const { body } = expressValidator;
import { registrar, login } from '../controllers/authController.js';
import { validarCampos } from '../middlewares/validarMiddleware.js';
const router = Router();
router.post('/registrar', [
    body('correo').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validarCampos
], registrar);
router.post('/login', [
    body('correo').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
    validarCampos
], login);
export default router;
