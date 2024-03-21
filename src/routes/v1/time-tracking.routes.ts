import { Router } from 'express';
import { makeGetTrackingsByDayController, makeGetTrackingsByMonthController } from 'src/factories/time-tracking.factory';

export const timeTrackingRoutes = Router();

// ** POST **

// ** GET **
timeTrackingRoutes.get('/day', makeGetTrackingsByDayController().handle);
timeTrackingRoutes.get('/month', makeGetTrackingsByMonthController().handle);

// ** PUT **

// ** DELETE **
