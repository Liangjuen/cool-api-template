import { Request, Response } from 'express'
import { ObjectSchema } from 'joi'

/**
 * 校验器中间件
 */
export class Validator {
	/**
	 * @description 校验器
	 * @param schema 校验规则
	 * @returns
	 */
	static check =
		(schema: Record<string, ObjectSchema>) =>
		(req: Request, res: Response, next: (e?: Error) => void): void => {
			const schemaObjects = ['query', 'body', 'params'].filter(
				(key: string) => schema[key] && req[key]
			)

			const error = schemaObjects
				.map(
					(key: string): { error: any } =>
						schema[key].validate(req[key], {
							abortEarly: true,
							allowUnknown: false
						}) as { error: any }
				)
				.filter(result => result.error)
				.map(result => result.error as Error)
				.slice()
				.shift()

			if (error) {
				return next(error)
			}
			next()
		}
}
