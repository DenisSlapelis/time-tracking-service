import { TrackingRepository } from '@interfaces/tracking-repository.interface';
import dayjs from 'dayjs';

export class GetTrackingsByMonthUseCase {
    constructor(private repository: TrackingRepository) {}

    handle = async (username: string, date?: string) => {
        const lastMonth = dayjs().add(-1, 'month').format('YYYY-MM');
        const result = await this.repository.getTrackingsByMonth(username, date || lastMonth);

        let monthWorkedMinutes = 0;

        const consolidatedData = result.map((item) => {
            const { trackings, referenceDate } = item;
            const dayWorkedMinutes = this.calculateWorkedHours(trackings);

            monthWorkedMinutes += dayWorkedMinutes;

            return {
                trackings: this.formatTrackings(trackings),
                dayWorkedHours: this.convertToHours(dayWorkedMinutes),
                referenceDate: dayjs(referenceDate).format('DD/MM/YYYY'),
            };
        });

        return {
            monthWorkedHours: this.convertToHours(monthWorkedMinutes),
            trackingsByDay: consolidatedData,
        };
    };

    calculateWorkedHours = (trackings: Array<any>) => {
        let totalMinutes = 0;

        trackings.forEach((tracking) => {
            const checkin = dayjs(tracking.checkin);
            const checkout = dayjs(tracking.checkout);

            if (tracking.checkout) {
                totalMinutes += checkout.diff(checkin, 'minutes');
            }
        });

        return totalMinutes;
    };

    convertToHours = (minutes: number) => {
        const restMinutes = minutes % 60;
        const hours = Math.floor(minutes / 60);

        if (restMinutes) return `${hours}h ${restMinutes}min`;

        return `${hours}h`;
    };

    formatTrackings = (trackings: Array<any>) => {
        return trackings.map((item) => {
            const result = {
                checkin: dayjs(item.checkin).format('DD/MM/YYYY - HH:mm'),
            };

            if (item.checkout) result['checkout'] = dayjs(item.checkout).format('DD/MM/YYYY - HH:mm');

            return result;
        });
    };
}
