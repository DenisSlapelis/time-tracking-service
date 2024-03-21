export interface findAllParams {
    table: string;
    keys: string;
    values: Record<string, Record<string, any>>;
    fields?: string;
    index?: string;
}
