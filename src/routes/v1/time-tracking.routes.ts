import { Router } from 'express';
import { makeGetTrackingsByDayController, makeGetTrackingsByMonthController, makeSendReportToEmailController } from 'src/factories/time-tracking.factory';

export const timeTrackingRoutes = Router();

// ** POST **
timeTrackingRoutes.post('/report', makeSendReportToEmailController().handle);

// ** GET **
timeTrackingRoutes.get('/day', makeGetTrackingsByDayController().handle);
timeTrackingRoutes.get('/month', makeGetTrackingsByMonthController().handle);

// ** PUT **

// ** DELETE **
