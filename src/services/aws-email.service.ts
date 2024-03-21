import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '@env';
import { EmailService } from '@interfaces/email-service.interface';

export class AWSEmailService implements EmailService {
    getClient = () => {
        return new SESClient({
            region: env.getValue('AWS_REGION'),
            credentials: {
                accessKeyId: env.getValue('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env.getValue('AWS_SECRET_ACCESS_KEY'),
            },
        });
    };

    send = async (params: any) => {
        const { destination, source, data, subject } = params;

        const client = this.getClient();

        const commandParams = {
            Destination: {
                ToAddresses: destination,
            },
            Message: {
                Body: {
                    Text: {
                        Data: data,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
            Source: source,
        };

        await client.send(new SendEmailCommand(commandParams));
    };
}
