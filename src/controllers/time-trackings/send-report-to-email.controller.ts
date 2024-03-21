import { SendReportToEmailUseCase } from '@useCases/send-report-to-email.use-case';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';

export class SendReportToEmailController {
    constructor(private useCase: SendReportToEmailUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const result = await this.useCase.handle('wollt', '2024-03', ['denis.slapelis.aws.2024@gmail.com']);

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
