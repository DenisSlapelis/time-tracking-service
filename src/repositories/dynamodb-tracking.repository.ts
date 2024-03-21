import { dynamodb } from '@env';
import { TrackingRepository } from '@interfaces/tracking-repository.interface';

export class DynamoDBTrackingRepository implements TrackingRepository {

    async getCurrentDayTrackings(username: string) {
        const result = await dynamodb.find({
            table: 'time-tracking-records',
            fields: 'referenceDate, trackings',
            keys: 'username = :user AND referenceDate = :dt',
            values: {
                ':user': { S: username },
                ':dt': { S: '2024-03-20' },
            },
            index: 'username-referenceDate-index',
        });

        return result?.length ? result[0] : [];
    }

    async getLastMonthTrackings() {}
}
