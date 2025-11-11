import express from 'express';
import cors from 'cors';
import bugsRouter from './routes/bugs.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { CORS_ORIGIN } from './config/env.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN || '*' }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/bugs', bugsRouter);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;