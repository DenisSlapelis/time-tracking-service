import { healthCheckController, loginController } from '../utils/dependency.utils';
import { Router } from 'express';
import { router as routesV1 } from './v1/routes';

export const router = Router();

const noSniff = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
};

// login
const loginRoutes = Router();
loginRoutes.post('/', noSniff, loginController.login);

// custom routes
router.use('/healthcheck', noSniff, Router().get('/', healthCheckController.check));
router.use('/login', noSniff, loginRoutes);

// v1 routes
router.use('/api/v1', noSniff, routesV1);
