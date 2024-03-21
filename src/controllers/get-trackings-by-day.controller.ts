import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';
import { GetTrackingsByDayUseCase } from '@useCases/get-current-day-tracking.use-case';

export class GetTrackingsByDayController {
    constructor(private useCase: GetTrackingsByDayUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const result = await this.useCase.handle('wollt');

            res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'GetTrackingsByDayController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] ?? STATUS_CODE.SERVER_ERROR;

            res.status(statusCode).json({ message: error?.message ?? error });
        }
    };
}
