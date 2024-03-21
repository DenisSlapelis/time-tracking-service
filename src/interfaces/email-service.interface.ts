export interface EmailService {
    send(params: any): Promise<void>;
}
