import { Router } from 'express';
import authRouter from './auth';
import userRouter from './users';
import eventRouter from './events';
import ticketRouter from './tickets';
import reserveRouter from './reserve';
import webhookRouter from './webhook';
const router = Router();

router.get('/ping', (req, res) => res.send('server running'));
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/tickets', ticketRouter);
router.use('/reserves', reserveRouter);
router.use('/webhooks', webhookRouter);

export default router;
