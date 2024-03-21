import { Router } from 'express';
import { makeGetCurrentDayTrackingController } from 'src/factories/trackings.factory';

export const trackingRoutes = Router();

// ** POST **
// trackingRoutes.post('/', makeCreateOrderController().handle);

// ** GET **
trackingRoutes.post('/', makeGetCurrentDayTrackingController().handle);

// ** PUT **
// trackingRoutes.put('/', makeUpdateOrderController().handle);

// ** DELETE **
