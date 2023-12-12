import * as fs from 'fs'
import winston, { addColors } from 'winston'
import 'winston-daily-rotate-file'

import { LOGS, isProd } from './env.config'
import { LOG_LEVEL, LOG_COLOR } from '@enums'
import { toObj } from '@utils/enum'

export class LoggerConfiguration implements winston.LoggerOptions {

    readonly level = LOGS.LEVEL as unknown as string

    readonly levels = toObj<number>(LOG_LEVEL)

    readonly format = winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.printf(({level, timestamp, message}) => {
            return `[${timestamp}][${level}]: ${message}`
        })
    )
    
    static colors = LOG_COLOR

    transports: winston.transport[] = []

    constructor() {
        this.transports.push(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
            )
        }))

        // 在默认只在生产环境将日志记录到 log 目录下，根据需要更改
        if (isProd()) {
            if (!fs.existsSync(LOGS.DIR)) {
                fs.mkdirSync(LOGS.DIR)
            }
            this.transports.push(
                new winston.transports.DailyRotateFile({
                    level: LOGS.LEVEL as unknown as string,
                    filename: `${LOGS.DIR}/%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: 1024,
                    maxFiles: '7d',
                })
            )
        }

        addColors(LoggerConfiguration.colors)
    }
}

export const loggerConfig = new LoggerConfiguration()
