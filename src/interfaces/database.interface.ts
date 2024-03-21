export type Models = 'Order';

export interface Database {
    create(table: string, data: any): Promise<any>;
    find(table: string, data: any): Promise<any>;
}
