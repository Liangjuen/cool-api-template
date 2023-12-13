import winston from 'winston'
import { LoggerConfiguration } from '@config/logger.config'

/**
 * @description 自定义日志
 */
export const Logger = winston.createLogger(new LoggerConfiguration())
