import { GetTrackingsByDayController } from '@controllers/get-trackings-by-day.controller';
import { GetTrackingsByDayUseCase } from "@useCases/get-trackings-by-day.use-case";
import { DynamoDBTrackingRepository } from "@repositories/dynamodb-tracking.repository";
import { GetTrackingsByMonthController } from '@controllers/get-trackings-by-month.controller';
import { GetTrackingsByMonthUseCase } from '@useCases/get-trackings-by-month.use-case';

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
