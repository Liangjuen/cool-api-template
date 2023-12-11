import { MySQLException, NotFoundError, ValidationException, ServerException } from '@exceptions'
import { IError, IHTTPException } from '@interfaces'

/**
 * @description 错误工厂
 */
export class ExceptionFactory {

    /**
     * @description 获取错误类型
     * @param error 
     * @returns 
     */
    static get(error: IError): IHTTPException {

        // 首先过滤自定义错误类型
        if(error.type == 'CustomException') return error as IHTTPException

        // typeORM、Joi错误
        switch (error.name) {
            case 'QueryFailedError':
                return new MySQLException(error)
            case 'EntityNotFound':
            case 'EntityNotFound':
            case 'MustBeEntityError':
                return new NotFoundError(error)
            case 'ValidationError':
                return new ValidationException(error)
        }

        // 5xx 错误
        // Js 原生错误类型 ( Error | EvalError | RangeError | SyntaxError | TypeError | URIError )
         if (!error.httpStatusCode && !error.statusCode && !error.status) { 
            switch(error.constructor.name) {
                case 'Error':
                case 'EvalError':
                case 'TypeError':
                case 'SyntaxError':
                case 'RangeError':
                case 'URIError':
                    return new ServerException(error)
            }
        }

        // 未知错误
        return new ServerException(error)
    }
}