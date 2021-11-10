import { Router } from 'express';

import { logged } from 'src/middlewares/authorization.middleware';
import ticketController from 'src/controllers/ticket.controller';

const router = Router();

router.post('/', logged, ticketController.create);
router.put('/:ticketId', logged, ticketController.update);
router.delete('/:ticketId', logged, ticketController.delete);

export default router;
