import { dynamodb } from '@env';
import { DynamoDBTrackingRepository } from '@repositories/dynamodb-tracking.repository';
import { GetTrackingsByDayUseCase } from '@useCases/get-trackings-by-day.use-case';
import dayjs from 'dayjs';

describe('Get trackings by day use case', () => {
    let repository: DynamoDBTrackingRepository;
    let useCase: GetTrackingsByDayUseCase;

    beforeAll(async () => {
        dynamodb.init();

        repository = new DynamoDBTrackingRepository();
        useCase = new GetTrackingsByDayUseCase(repository);
    });

    describe('handle', () => {
        test('should return a tracking list', async () => {
            const getTrackingsByDayMock = jest.spyOn(repository, 'getTrackingsByDay').mockResolvedValue({
                trackings: [
                    {
                        checkin: '2024-03-21 09:00',
                        checkout: '2024-03-21 18:00',
                    },
                ],
                referenceDate: '2024-03-21',
            });
            const calculateWorkedHoursMock = jest.spyOn(useCase, 'calculateWorkedHours').mockReturnValueOnce('8h');

            const result = await useCase.handle('test', dayjs());

            expect(getTrackingsByDayMock).toHaveBeenCalledWith('test', '2024-03-21');
            expect(calculateWorkedHoursMock).toHaveBeenCalledWith([
                {
                    checkin: '2024-03-21 09:00',
                    checkout: '2024-03-21 18:00',
                },
            ]);
            expect(result).toEqual({
                'trackings': [
                    {
                        'checkin': '21/03/2024 - 09:00',
                        'checkout': '21/03/2024 - 18:00',
                    },
                ],
                'workedHours': '8h',
                'referenceDate': '21/03/2024',
            });
        });
    });
});
