import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { FileController } from './file.controller'
import { RequestMethod } from '@enums'

export class FileRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/uploadMode',
				method: RequestMethod.Get,
				middlewares: [FileController.getUploadMode]
			},
			{
				segment: '/upload',
				method: RequestMethod.Post,
				middlewares: [FileController.upload]
			}
		]
	}
}
