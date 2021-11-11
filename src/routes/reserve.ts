import { Router } from 'express';

import { logged } from 'src/middlewares/authorization.middleware';
import reserveController from 'src/controllers/reserve.controller';

const router = Router();

router.get('/', logged, reserveController.list);
router.post('/', logged, reserveController.create);

export default router;
