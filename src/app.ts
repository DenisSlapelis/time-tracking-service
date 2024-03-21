import express from 'express';
import cors from 'cors';
import { router as routes } from './routes'
import { authMiddleware, env, loggerMiddleware } from '@utils/dependency.utils';

export const app = express();

app.use(express.json());

const corsOptions = {
    origin: env.getValue('CORS_ORIGIN'),
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(loggerMiddleware.use);

app.use(authMiddleware.use);

app.use(routes);

app.disable("x-powered-by");
