import 'reflect-metadata';
import { Express } from 'express';
import { app } from './app';
import { dynamodb, env } from '@env';
import * as logger from '@logger';
import { showMemory } from '@utils/memory.utils';

const main = async () => {
    logger.warn(JSON.stringify(showMemory()));

    await env.populateAllEnvs();

    dynamodb.init();

    startServer(app, env.getValue('PORT'));
};

const startServer = (app: Express, port: number) => {
    app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
    });
};

main().catch((err) => logger.error(`== error: ${err}`));
