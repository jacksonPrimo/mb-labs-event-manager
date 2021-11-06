import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
dotEnv.config();
const app = express();
app.use('/ping', (req, res) => res.send('server running'));
app.use(process.env.CORS_ORIGIN ? cors({ origin: process.env.CORS_ORIGIN }) : cors());

export default app;
