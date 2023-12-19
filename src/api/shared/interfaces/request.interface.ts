export interface IRequestQuery {
	page?: string | number
	size?: string | number
	startDate?: Date
	endDate?: Date
	order?: 'DESC' | 'ASC'
	sort?: string
}

export interface IRequestParams {
	id?: string
	ids?: string
}
