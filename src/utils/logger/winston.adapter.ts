import { format, createLogger, addColors, transports as winstonTransport } from 'winston';
const { combine, colorize } = format;
const colorizer = colorize();
const winstonConsole = new winstonTransport.Console({ level: 'debug' });

export class WinstonAdapter {
    level: any;
    meta: any;
    transports: any[];
    options: any;

    constructor({ level, meta }) {
        this.level = level ?? 'info';
        this.meta = meta ?? {};
        this.transports = [winstonConsole];
        this.options = this.formatOptions();
    }

    private formatOptions() {
        return {
            level: this.level,
            exitOnError: false,
            format: combine(
                format.json(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:SS',
                }),
                format.printf((logMessage) => {
                    const { level, timestamp, message } = logMessage;
                    let fullMessage = `[${timestamp}] - [${level.toLocaleUpperCase()}] ${message}`;

                    if (['error', 'debug'].includes(level)) fullMessage += ` ${JSON.stringify(this.meta)}`

                    return colorizer.colorize(level, fullMessage);
                })
            ),
            transports: this.transports,
        };
    }

    getLogger() {
        addColors({
            error: 'redBG',
            warn: 'yellow',
            info: 'blue',
            debug: 'yellowBG',
        });

        return createLogger(this.options);
    }
}
