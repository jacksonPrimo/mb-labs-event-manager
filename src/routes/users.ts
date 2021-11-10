import { Router } from 'express';
import userController from 'src/controllers/user.controller';
import { logged } from 'src/middlewares/authorization.middleware';
const router = Router();
router.get('/', userController.get);
router.put('/', logged, userController.update);

export default router;
