function pagination(arr, singlePageCount) {
	
	// 要分多少页
	const count = Math.ceil(arr.length / singlePageCount)
	
	const pages = []
	let preIndex = 0
	for (let i = 1; i <= count; i++) {
		const endIndex = i * singlePageCount

		pages.push(arr.slice(preIndex, endIndex))
		preIndex = endIndex
	}
	
	return pages
}

export {
	pagination
}
