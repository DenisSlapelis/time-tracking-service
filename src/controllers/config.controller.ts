import express, { Request, Response, Router } from 'express';
import { ConfigService } from '@services/config.service';
import {  inject, injectable } from 'tsyringe';

@injectable()
export class ConfigController {
    private router: Router;

    constructor(
        @inject('ConfigService') private service: ConfigService) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        // ** POST **
        this.router.post('/', this.reloadEnvs);

        // ** GET **

        // ** PATCH **
        // ** PUT **
        // ** DELETE **
    }

    public getRouter = (): Router => {
        return this.router;
    }

    private reloadEnvs = async (req: Request, res: Response) => {
        try {
            const result = await this.service.reload();

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error?.message ?? error });
        }
    }
}
