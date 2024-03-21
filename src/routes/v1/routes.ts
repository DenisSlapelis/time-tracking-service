import { configController } from '@utils/dependency.utils';
import { trackingRoutes } from './tracking.routes';
import { Router } from 'express';

export const router = Router();

router.use('/configs', configController.getRouter());
router.use('/trackings', trackingRoutes);
