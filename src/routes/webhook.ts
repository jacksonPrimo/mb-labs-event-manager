import { Router } from 'express';
import reserveController from 'src/controllers/reserve.controller';
const router = Router();
router.put('/reserves', reserveController.update);

export default router;
