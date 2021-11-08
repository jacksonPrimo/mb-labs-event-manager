import { Router } from 'express';
import userController from 'src/controllers/user.controller';
const router = Router();
router.get('/', userController.get);
router.put('/', userController.update);

export default router;
