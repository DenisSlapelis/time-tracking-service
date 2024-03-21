import { Router } from 'express';
import { makeGetTrackingsByDayController, makeGetTrackingsByMonthController } from 'src/factories/trackings.factory';

export const trackingRoutes = Router();

// ** POST **
// trackingRoutes.post('/', makeCreateOrderController().handle);

// ** GET **
trackingRoutes.get('/day', makeGetTrackingsByDayController().handle);
trackingRoutes.get('/month', makeGetTrackingsByMonthController().handle);

// ** PUT **
// trackingRoutes.put('/', makeUpdateOrderController().handle);

// ** DELETE **
