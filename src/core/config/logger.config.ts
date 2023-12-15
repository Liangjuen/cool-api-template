import * as fs from 'fs'
import winston from 'winston'
import Transport from 'winston-transport'
import 'winston-daily-rotate-file'

import { LOGS, isProd } from './env.config'
import { LOG_LEVEL, LOG_COLOR } from '@enums'
import { toObj } from '@utils/enum'

const LEVEL_MAP = {
	error: '  ERROR',
	warn: '   WARN',
	info: '   INFO',
	http: '   HTTP',
	debug: '  DEBUG',
	verbose: 'VERBOSE',
	silly: '  SILLY'
}

const BASE_COLOR_MAP = {
	error: '\x1b[31m',
	warn: '\x1b[33m',
	info: '\x1b[92m',
	http: '\x1b[96m',
	debug: '\x1b[95m',
	verbose: '\x1b[35m',
	silly: '\x1b[36m'
}

/**
 * @description 自定义传输
 */
class customTransport extends Transport {
	constructor() {
		super()
	}
	public log(info: any, next: () => void) {
		const { stack, timestamp } = info

		const label = `${BASE_COLOR_MAP[info.level]}[${info.label}]\x1b[0m`
		const message = `${BASE_COLOR_MAP[info.level]}${info.message}\x1b[0m`
		const level = `${BASE_COLOR_MAP[info.level]}${LEVEL_MAP[info.level]}\x1b[0m`
		const context = info.context ? `\x1b[33m[${info.context}]\x1b[0m` : ''
		console.log(
			`${label} - [${timestamp}] ${level} ${context} ${message}`,
			stack ? '\n' + stack : ''
		)

		next()
	}
}

export class LoggerConfiguration implements winston.LoggerOptions {
	readonly level = LOGS.LEVEL as unknown as string

	readonly levels = toObj<number>(LOG_LEVEL)

	readonly format = winston.format.combine(
		winston.format.label({ label: 'CoolAPI' }),
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	)

	static colors = LOG_COLOR

	transports: winston.transport[] = [new customTransport()]

	constructor() {
		// 在默认只在生产环境将日志记录到 log 目录下，根据需要更改
		if (isProd()) {
			if (!fs.existsSync(LOGS.DIR)) {
				fs.mkdirSync(LOGS.DIR)
			}
			this.transports.push(
				new winston.transports.DailyRotateFile({
					format: winston.format.combine(
						winston.format.printf(({ level, label, timestamp, message }) => {
							return `[${label}] - [${timestamp}] ${level} ${message}`
						})
					),
					json: false,
					level: LOGS.LEVEL as unknown as string,
					filename: `${LOGS.DIR}/%DATE%.log`,
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: 1024,
					maxFiles: '7d'
				})
			)
		}
	}
}
