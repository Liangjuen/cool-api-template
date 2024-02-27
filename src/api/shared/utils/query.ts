export const toSkipAndTake = (page: string | number, size: string | number) => {
	const take = parseInt(size as string, 10)
	const cPage = parseInt(page as string, 10)
	const skip = (cPage - 1) * take
	return {
		take,
		skip,
		cPage
	}
}
