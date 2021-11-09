import { Router } from 'express';

import { logged } from 'src/middlewares/authorization.middleware';
import eventController from 'src/controllers/event.controller';

const router = Router();

router.post('/', logged, eventController.create);
router.put('/:eventId', logged, eventController.update);
router.get('/', logged, eventController.list);
router.delete('/:eventId', logged, eventController.delete);

export default router;
