import { Router } from 'express';
import authController from 'src/controllers/auth.controller';
const router = Router();
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
