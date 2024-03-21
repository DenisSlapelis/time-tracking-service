export interface TrackingRepository {
    getTrackingsByDay(username: string, date: string);
    getTrackingsByMonth(username: string, date: string);
}
