import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { LoginLog } from './login-log.entity'
import { LoginState } from './login-log.enum'
import { ILoginLogQueryString } from './login-log.interface'
import { toSkipAndTake } from '@shared/utils/query'

export class LoginLogRepository extends Repository<LoginLog> {
	constructor() {
		super(LoginLog, DateSource.createEntityManager())
	}

	/**
	 * @description 创建新 log
	 * @param opts
	 */
	async new(opts: {
		loginState: LoginState
		username: string
		userId: number
		ip: string
		message: string
		isMobile?: boolean
		browser?: string
		os?: string
		idaddr?: string
	}) {
		const log = this.create()
		for (let key in opts) {
			//
			log[key] = opts[key]
		}
		await this.save(log)
	}

	/**
	 * @description 获取日志列表
	 * @param param
	 * @returns
	 */
	async list({
		page = 1,
		size = 10,
		keyword,
		startDate,
		endDate,
		state
	}: ILoginLogQueryString) {
		const { skip, take, cPage } = toSkipAndTake(page, size)

		const query = this.createQueryBuilder('loginLog')

		if (keyword) {
			query.andWhere(
				'loginLog.username LIKE :username OR loginLog.ip LIKE :ip',
				{
					username: '%' + keyword + '%',
					ip: '%' + keyword + '%'
				}
			)
		}

		if (state) {
			query.andWhere('loginState = :state', { state })
		}

		if (startDate && endDate) {
			query.andWhere('createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate
			})
		}

		query.addOrderBy('createdAt', 'DESC')

		const [result, total] = await query.skip(skip).take(take).getManyAndCount()

		return {
			result,
			total,
			cPage,
			size: take
		}
	}
}
