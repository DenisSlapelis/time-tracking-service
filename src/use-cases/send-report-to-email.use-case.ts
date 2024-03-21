import { EmailService } from '@interfaces/email-service.interface';
import { GetTrackingsByMonthUseCase } from './get-trackings-by-month.use-case';
import dayjs from 'dayjs';
import { MONTHS } from '@utils/constants.utils';
import { env } from '@env';

export class SendReportToEmailUseCase {
    constructor(
        private emailService: EmailService,
        private useCase: GetTrackingsByMonthUseCase
    ) {}

    handle = async (username: string, reportDate: string, destination: Array<string>) => {
        const data = await this.useCase.handle(username, reportDate);

        const obj = {
            destination,
            source: env.getValue('SOURCE_EMAIL'),
            data: this.template(reportDate, data),
            subject: `Mensal report (${dayjs(reportDate).format('MM/YYYY')})`,
        };

        await this.emailService.send(obj);
    };

    private getTime = (str: string) => {
        return str.split('- ')[1];
    };

    private template = (reportDate, data) => {
        let tbodyData = '';

        data.trackingsByDay.forEach((item) => {
            const lastCheckoutIdx = item.trackings.length - 1;

            let intervalos = '';
            for (let i = 0; i < item.trackings.length - 1; i++) {
                if (i == lastCheckoutIdx) {
                    break;
                }

                const current = item.trackings[i]?.checkout;
                const next = item.trackings[i + 1].checkin;

                intervalos += `${this.getTime(current)} - ${this.getTime(next)}, `;
            }

            tbodyData += `
                <tr>
                    <td>${item.referenceDate}</td>
                    <td>${this.getTime(item.trackings[0]?.checkin)}</td>
                    <td>${intervalos?.slice(0, -2) || ' - '}</td>
                    <td>${this.getTime(item.trackings[lastCheckoutIdx]?.checkout)}</td>
                    <td>${item.dayWorkedHours}</td>
                </tr>
            `;
        });

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Relatório de Horas Trabalhadas</title>
            </head>
            <body>
                <h2>Relatório de Horas Trabalhadas</h2>
                <p>
                <strong>Mês:</strong> ${MONTHS[dayjs(reportDate).month()]} de ${dayjs(reportDate).year()}
                </p>
                <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                    <th>Data</th>
                    <th>Check-in</th>
                    <th>Intervalos</th>
                    <th>Check-out</th>
                    <th>Horas Trabalhadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${tbodyData}
                </tbody>
                <tfoot>
                    <tr>
                    <th colspan="4">Total horas trabalhadas no mês</th>
                    <td>${data.monthWorkedHours}</td>
                    </tr>
                </tfoot>
                </table>
            </body>
            </html>
        `;
    };
}
