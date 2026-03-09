import express from 'express';
import cors from 'cors';
import scoreRoutes from './routes/scoreRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/scores', scoreRoutes);
app.use(errorHandler); 


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Sistem çalışıyor!' });
});

export default app;