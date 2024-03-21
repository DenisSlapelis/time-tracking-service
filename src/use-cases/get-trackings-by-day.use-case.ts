import { TrackingRepository } from '@interfaces/tracking-repository.interface';
import dayjs from 'dayjs';

export class GetTrackingsByDayUseCase {
    constructor(private repository: TrackingRepository) {}

    handle = async (username: string, date: any) => {
        const parseDate = dayjs(date).format('YYYY-MM-DD');
        const currentDate = dayjs().format('YYYY-MM-DD');

        const reportDate = parseDate == 'Invalid Date' ? currentDate : parseDate;

        const { trackings, referenceDate } = await this.repository.getTrackingsByDay(username, reportDate);

        const workedHours = this.calculateWorkedHours(trackings);

        return {
            trackings: this.formatTrackings(trackings),
            workedHours,
            referenceDate: dayjs(referenceDate).format('DD/MM/YYYY'),
        };
    };

    calculateWorkedHours = (trackings: Array<any>) => {
        let totalMinutes = 0;

        trackings?.forEach((tracking) => {
            const checkin = dayjs(tracking.checkin);
            const checkout = dayjs(tracking.checkout);

            if (tracking.checkout) {
                totalMinutes += checkout.diff(checkin, 'minutes');
            }
        });

        return this.convertToHours(totalMinutes);
    };

    convertToHours = (minutes: number) => {
        if (minutes == 0) return '';

        const restMinutes = minutes % 60;
        const hours = Math.floor(minutes / 60);

        if (restMinutes) return `${hours}h ${restMinutes}min`;

        return `${hours}h`;
    };

    formatTrackings = (trackings: Array<any>) => {
        return trackings?.map((item) => {
            const result = {
                checkin: dayjs(item.checkin).format('DD/MM/YYYY - HH:mm'),
            };

            if (item.checkout) result['checkout'] = dayjs(item.checkout).format('DD/MM/YYYY - HH:mm');

            return result;
        }) || [];
    };
}
