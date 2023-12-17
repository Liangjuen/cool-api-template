export const toSkipAndTake = (page: string | number, size: string | number) => {
	const take = parseInt(size as string, 10)
	const skip = (parseInt(page as string, 10) - 1) * take
	return {
		take,
		skip
	}
}
