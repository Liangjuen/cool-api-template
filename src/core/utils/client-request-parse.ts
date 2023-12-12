import { Request } from 'express'

export default class ClientRequestParse {

    /**
     * @description 抽取
     * @param req Express 请求对象
     */
    extract(req: Request): {
        ip: string,
        method: string,
        httpVersion: string,
        url: string
    } {
        const ip = getClientIp(req)
        const method = req.method
        const httpVersion = req.httpVersion
        const url = req.url
        
        return {
            ip,
            method,
            httpVersion,
            url
        }
    }


    /**
     * @description 获取客户端 IP
     * @param req Express 请求对象
     * @returns 
     */
    getClientIp(req: Request): string {
        const ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        ''
        return ipv6ToV4(ip as string)
    }

    /**
     * @description ipv6 to ipv4
     * @returns 
     */
    ipv6ToV4(ip: string): string{
        if(ip && ip.split(',').length > 0) {
            ip = ip.split(',')[0].slice(ip.lastIndexOf(':') + 1, ip.length)
        }
        return ip
    }
}

const {
    extract,
    getClientIp,
    ipv6ToV4
} = new ClientRequestParse()

export {
    extract,
    getClientIp,
    ipv6ToV4
}

