export interface IQueryString {
	page?: string | number
	size?: string | number
	startDate?: Date
	endDate?: Date
	order?: 'DESC' | 'ASC'
	sort?: string
}
