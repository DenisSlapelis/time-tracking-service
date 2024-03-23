import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { EmailService } from '@interfaces/email-service.interface';

export class AWSEmailService implements EmailService {
    getClient = () => {
        return new SESClient({
            region: 'sa-east-1',
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID!,
                secretAccessKey: process.env.SECRET_ACCESS_KEY!,
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
                        Data: 'Relatório de Horas Trabalhadas',
                    },
                    Html: {
                        Data: data,
                        Charset: 'utf-8',
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
