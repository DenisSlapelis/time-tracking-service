import { GetTrackingsByDayController } from '@controllers/time-trackings/get-trackings-by-day.controller';
import { GetTrackingsByDayUseCase } from "@useCases/get-trackings-by-day.use-case";
import { DynamoDBTrackingRepository } from "@repositories/dynamodb-tracking.repository";
import { GetTrackingsByMonthController } from '@controllers/time-trackings/get-trackings-by-month.controller';
import { GetTrackingsByMonthUseCase } from '@useCases/get-trackings-by-month.use-case';
import { SendReportToEmailUseCase } from '@useCases/send-report-to-email.use-case';
import { SendReportToEmailController } from '@controllers/time-trackings/send-report-to-email.controller';
import { AWSEmailService } from '@services/aws-email.service';

export const makeGetTrackingsByDayController = () => {
    const useCase = makeGetTrackingsByDayUseCase();

    return new GetTrackingsByDayController(useCase);
};

export const makeGetTrackingsByDayUseCase = () => {
    const repository = new DynamoDBTrackingRepository();

    return new GetTrackingsByDayUseCase(repository);
}

export const makeGetTrackingsByMonthController = () => {
    const useCase = makeGetTrackingsByMonthUseCase();

    return new GetTrackingsByMonthController(useCase);
};

export const makeGetTrackingsByMonthUseCase = () => {
    const repository = new DynamoDBTrackingRepository();

    return new GetTrackingsByMonthUseCase(repository);
}

export const makeSendReportToEmailController = () => {
    const useCase = makeSendReportToEmailUseCase();

    return new SendReportToEmailController(useCase);
};

export const makeSendReportToEmailUseCase = () => {
    const useCase = makeGetTrackingsByMonthUseCase();
    const emailService = new AWSEmailService();

    return new SendReportToEmailUseCase(emailService, useCase);
};
