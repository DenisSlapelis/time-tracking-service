import { Request, Response } from 'express';
import { HealthCheckService } from '@services/healthcheck.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HealthCheckController {
    constructor(
        @inject('HealthCheckService') private service: HealthCheckService) { }

    check = async (req: Request, res: Response) => {
        try {
            const result = await this.service.check();

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error?.message ?? error });
        }
    }
}
