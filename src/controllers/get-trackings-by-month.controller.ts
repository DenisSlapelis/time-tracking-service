import { GetTrackingsByMonthUseCase } from '@useCases/get-trackings-by-month.use-case';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';

export class GetTrackingsByMonthController {
    constructor(private useCase: GetTrackingsByMonthUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const result = await this.useCase.handle('wollt', '2024-03');

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
