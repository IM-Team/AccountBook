
/**
 * 根据每页的个数进行分页
 * @param {Array} arr	要进行分页的数组
 * @param {Number} singlePageCount	单页多少个
 * @return {Array} 分好的数组
 */
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

/**
 * 一个数是否是浮点数
 * @param {Object} number	需要进行判断的数字
 * @return {Boolean} 是否是浮点数
 */
function isFloat(number) {
	return number.toString().indexOf('.') !== -1
}

/**
 * 字符串逆序
 * @param {Object} 需要逆序的字符串
 * @return {String} 逆序的字符串
 */
function stringReverse(str) {
	return str.split('').reverse().join('')
}

/**
 * 字符串按位分割添加字符或字符串
 * @param {String} target		目标字符串
 * @param {Number} byteNumber	每多少位添加字符或字符串
 * @param {String} symbol		添加的字符或者字符串
 * @param {Boolean} isReverse	是否逆序添加
 * @return {String}				处理完的字符串
 */
function addSymbolOfByte(target, byteNumber, symbol, isReverse = true) {
	
	if (target.length === byteNumber) return target
	
	if (isReverse) target = stringReverse(target)
	
	const partCount = Math.floor(target.length / byteNumber)
	let result = '', preIndex = 0
	for (let i = 1; i <= partCount; i ++) {
		result += target.slice(preIndex, i * byteNumber) + symbol
		preIndex = i * byteNumber
	}
	result += target.slice(preIndex)

	return isReverse ? stringReverse(result) : result
}

/**
 * 英文三分法
 * @param {Number} number	进行分割的数字或字符串
 * @return {String}			处理完的三分字符串
 */
function ruleOfThirds(number) {
	
	let integer, dicimal

	number = number.toString()
	if (isFloat(number)) {
		[integer, dicimal] = number.split('.')
	} else {
		integer = number
		dicimal = '00'
	}
	
	return addSymbolOfByte(integer, 3, ',') + '.' + dicimal
}

export {
	pagination,
	ruleOfThirds,
	isFloat,
	stringReverse
}
