import { EmailService } from '@interfaces/email-service.interface';
import { GetTrackingsByMonthUseCase } from './get-trackings-by-month.use-case';

export class SendReportToEmailUseCase {
    constructor(
        private emailService: EmailService,
        private useCase: GetTrackingsByMonthUseCase
    ) {}

    handle = async (username: string, date?: string) => {
        const data = await this.useCase.handle(username);

        const obj = {
            destination: ['denis.slapelis.aws.2024@gmail.com'],
            source: 'denis.slapelis.aws.2024@gmail.com',
            data,
            subject: 'Mensal report (02/2024)',
        };

        await this.emailService.send(obj);
    };
}
