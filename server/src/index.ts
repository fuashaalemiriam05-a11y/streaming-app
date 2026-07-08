import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler.js';
import { router as v1Router } from './routes/index.js';

export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`StreamCM server listening on ${PORT}`);
  });
}
