import { WinstonAdapter } from './winston.adapter';

const createLogger = ({ level, meta }) => {
    const winston = new WinstonAdapter({ level, meta });

    return winston.getLogger();
};

const handleLog = ({ level, msg, meta }) => {
    const logger = createLogger({ level, meta });

    switch (level) {
        case 'error': // 0
            logger.error(msg);
            break;

        case 'warn': // 1
            logger.warn(msg);
            break;

        case 'info': // 2
            logger.info(msg);
            break;

        case 'debug': // 5
            logger.debug(msg);
            break;

        default:
            logger.info(msg);
            break;
    }
};

export const error = (err, meta?) => {
    handleLog({ level: 'error', msg: err, meta });
};

export const warn = (err, meta?) => {
    handleLog({ level: 'warn', msg: err, meta });
};

export const info = (msg, meta?) => {
    handleLog({ level: 'info', msg, meta });
};

export const debug = (msg, meta?) => {
    handleLog({ level: 'debug', msg, meta });
};
