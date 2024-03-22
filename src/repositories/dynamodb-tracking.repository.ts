import { dynamodb } from '@env';
import { TrackingRepository } from '@interfaces/tracking-repository.interface';

export class DynamoDBTrackingRepository implements TrackingRepository {
    async getTrackingsByDay(username: string, date: string): Promise<any> {
        const result = await dynamodb.find({
            table: 'time-tracking-records',
            fields: 'referenceDate, trackings',
            keys: 'username = :user AND referenceDate = :dt',
            values: {
                ':user': { S: username },
                ':dt': { S: date },
            },
            index: 'username-referenceDate-index',
        });

        return result?.length ? result[0] : [];
    }

    async getTrackingsByMonth(username: string, date: string): Promise<any> {
        const result = await dynamodb.find({
            table: 'time-tracking-records',
            fields: 'referenceDate, trackings',
            keys: 'username = :user AND begins_with(referenceDate, :dt)',
            values: {
                ':user': { S: username },
                ':dt': { S: date },
            },
            index: 'username-referenceDate-index',
        });

        return result;
    }
}
