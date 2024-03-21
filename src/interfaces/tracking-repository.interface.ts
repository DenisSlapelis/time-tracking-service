export interface TrackingRepository {
    getCurrentDayTrackings(username: string);
    getLastMonthTrackings();
}
