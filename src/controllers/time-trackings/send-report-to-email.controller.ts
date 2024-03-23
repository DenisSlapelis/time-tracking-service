import { SendReportToEmailUseCase } from '@useCases/send-report-to-email.use-case';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';

export class SendReportToEmailController {
    constructor(private useCase: SendReportToEmailUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { date } = req.query;
            const usename = req['user'];

            const result = await this.useCase.handle(usename, date, [process.env.SOURCE_EMAIL!]);

            res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'SendReportToEmailController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] ?? STATUS_CODE.SERVER_ERROR;

            res.status(statusCode).json({ message: error?.message ?? error });
        }
    };
}
