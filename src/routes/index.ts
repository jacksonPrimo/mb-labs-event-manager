import { Router } from 'express';
import authRouter from './auth';
import userRouter from './users';
import eventRouter from './events';
import ticketRouter from './tickets';
const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/tickets', ticketRouter);

export default router;
