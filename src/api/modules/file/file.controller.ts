import { coolFile } from '@services'
import { Resolve } from '@decorators'
import { IRequest, IResponse } from '@interfaces'

export class FileController {
	@Resolve()
	static async upload(req: IRequest, res: IResponse) {
		res.locals.data = await coolFile.qiniu.upload()
	}

	@Resolve()
	static async getUploadMode(req: IRequest, res: IResponse) {
		res.locals.data = await coolFile.getMode()
	}
}
