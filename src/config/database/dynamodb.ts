import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Database } from '@interfaces/database.interface';
import { singleton } from 'tsyringe';

@singleton()
export class DynamoDBHelper implements Database {
    private client: DynamoDBClient | undefined;

    constructor() {
        this.init();
    }

    init() {
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async create(table: string, data: any) {
        const input = {
            TableName: table,
            Item: data,
        };

        const command = new PutItemCommand(input);

        return this.client!.send(command);
    }

    async find(params) {
        const { table, fields, keys, values, index } = params;
        const queryParams = {
            TableName: table,
            KeyConditionExpression: keys,
            ExpressionAttributeValues: values,
        };

        if (fields) queryParams['ProjectionExpression'] = fields;
        if (index) queryParams['IndexName'] = index;

        const command = new QueryCommand(queryParams);

        const { Items } = await this.client!.send(command);

        const result = Items?.map(item => {
            return unmarshall(item);
        });

        return result;
    }

    objectToDynamoMap = (object) => {
        const result = {};

        for (const key in object) {
            const isArray = Array.isArray(object[key]);

            result[key] = isArray ? { S: JSON.stringify(object[key]) } : { S: object[key].toString() };
        }

        return { M: result };
    };
}
