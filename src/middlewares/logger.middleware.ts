import dayjs from 'dayjs';
import crypto from 'crypto';
import * as logger from '@logger';
import { singleton } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

@singleton()
export class LoggerMiddleware {
    private lastHealthcheck: dayjs.Dayjs;
    private firstCheck: boolean;
    private HEALTH_CHECK_ROUTE: string;

    constructor() {
        this.lastHealthcheck = dayjs();
        this.firstCheck = true;
        this.HEALTH_CHECK_ROUTE = '/healthcheck'
    }

    use = (req: Request, res: Response, next: NextFunction) => {
        const requestId = crypto.randomUUID();
        req['requestId'] = requestId;
        const { method, headers } = req;
        const route = req.originalUrl ?? req.url ?? '';
        const params = JSON.stringify(req.query);
        const meta = {
            method,
            route,
            params,
            header: JSON.stringify(headers),
            requestId,
        };

        res.on('finish', this.handleFinishEvent.bind(req, res, meta));

        if (route === this.HEALTH_CHECK_ROUTE) {
            return this.checkSendHealthcheckLog(requestId, next);
        }

        const msg = this.formatMessage(meta);

        logger.info(`[REQUEST] ${requestId} ${msg}`, meta);

        next();
    }

    handleFinishEvent = (req: any, res: any, meta: any) => {
        if (res['route'] === this.HEALTH_CHECK_ROUTE) return;

        const statusCode = req?.statusCode ?? req['req']['statusCode'];

        logger.info(`[FINISH-REQUEST] ${res['requestId']} - ${statusCode}`, { statusCode, ...meta });
    };

    checkSendHealthcheckLog = (requestId: string, next: NextFunction) => {
        const healthcheckMessage = `[HEALTHCHECK] OK ${requestId}`;

        if (this.firstCheck) {
            this.firstCheck = false;
            this.lastHealthcheck = dayjs();
            logger.warn(healthcheckMessage);
            return next();
        }

        const now = dayjs();
        const time = now.subtract(30, 'second');

        if (time > this.lastHealthcheck) {
            this.lastHealthcheck = dayjs();
            logger.warn(healthcheckMessage);
            return next();
        }

        return next();
    };

    formatMessage = (meta: Record<string, string>) => {
        const { method, route } = meta;

        return `${method.toUpperCase()} ${route}`;
    };
}
