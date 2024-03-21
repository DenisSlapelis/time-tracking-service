import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';
import { GetTrackingsByDayUseCase } from '@useCases/get-trackings-by-day.use-case';

export class GetTrackingsByDayController {
    constructor(private useCase: GetTrackingsByDayUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { date } = req.query;
            const usename = 'wollt';

            const result = await this.useCase.handle(usename, date);

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
