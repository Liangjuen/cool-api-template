import { DatabaseEngine } from './database-engine'
import { LOG_LEVEL } from '@enums'

type EnvAccessToken = { DURATION: number, SECRET: string }
type EnvServer = { PROTOCOL: string, DOMAIN: string, PORT: number }
type EnvMemoryCache = { IS_ACTIVE: boolean, DURATION: number }
type EnvTypeorm = { 
    TYPE: DatabaseEngine, 
    DB: string,
    HOST: string,
    PORT: number,
    PWD: string,
    USER: string,
    SYNC: boolean,
    LOG: boolean,
    CACHE: boolean,
    ENTITIES: string,
    MIGRATIONS: string,
    SUBSCRIBERS: string 
}
type EnvLog = { DIR: string, LEVEL: LOG_LEVEL }
type EnvRedis = { HOST: string, PORT: number, DB: number, USER: string, PASS: string }

export { EnvAccessToken, EnvServer, EnvMemoryCache, EnvTypeorm, EnvLog, EnvRedis }