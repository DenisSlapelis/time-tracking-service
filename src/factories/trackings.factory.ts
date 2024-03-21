import { GetCurrentDayTrackingController } from '@controllers/get-current-day-tracking.controller';
import { GeyCurrentDayTrackingUseCase } from "@useCases/get-current-day-tracking.use-case";
import { DynamoDBTrackingRepository } from "@repositories/dynamodb-tracking.repository";

export const makeGetCurrentDayTrackingController = () => {
    const useCase = makeGetCurrentDayTrackingUseCase();

    return new GetCurrentDayTrackingController(useCase);
};

export const makeGetCurrentDayTrackingUseCase = () => {
    const repository = new DynamoDBTrackingRepository();

    return new GeyCurrentDayTrackingUseCase(repository);
}
