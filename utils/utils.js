
/**
 * 根据每页的个数进行分页
 * @params {Array} arr	要进行分页的数组
 * @params {Number} singlePageCount	单页多少个
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
 * @params {Object} number	需要进行判断的数字
 * @return {Boolean} 是否是浮点数
 */
function isFloat(number) {
	return number.toString().indexOf('.') !== -1
}

/**
 * 字符串逆序
 * @params {Object} 需要逆序的字符串
 * @return {String} 逆序的字符串
 */
function stringReverse(str) {
	return str.split('').reverse().join('')
}

/**
 * 字符串按位分割添加字符或字符串
 * @params {String}  target		目标字符串
 * @params {String}  symbol		添加的字符或者字符串
 * @params {Number}  byteNumber	每多少位添加字符或字符串
 * @params {Boolean} isReverse	是否逆序添加
 * @return {String}				处理完的字符串
 */
function addSymbolOfByte(target, symbol, byteNumber = 3, isReverse = true) {
    
    // 位数不足判断
	if (target.length <= byteNumber) return target
    
    // 数组逆序
	if (isReverse) target = stringReverse(target)
    
    // 求需要添加的分割符数
    let partCount = Math.floor(target.length / byteNumber)

    // 防止 ',000' 这种情况
    if (target.length % byteNumber === 0) partCount--

    // 分割
	let result = '', preIndex = 0
	for (let i = 1; i <= partCount; i ++) {
		result += target.slice(preIndex, i * byteNumber) + symbol
		preIndex = i * byteNumber
    }

    // 补上没有添加符号的位
    result += target.slice(preIndex)

	return isReverse ? stringReverse(result) : result
}

/**
 * 英文三分法
 * @params {Number} number	进行分割的数字或字符串
 * @return {String}			处理完的三分字符串
 */
function ruleOfThirds(number) {
    
    if (!number) return

    number = number.toString()
    const numberSplitArr = isFloat(number) ? number.split('.') : [number, '00']

    // 防止 '-,11.00' 情况
    if (numberSplitArr[0].charAt(0) === '-') {
        numberSplitArr[0] = addSymbolOfByte(numberSplitArr[0].slice(1), ',')
        return '-' + numberSplitArr.join('.')
    }
    
    numberSplitArr[0] = addSymbolOfByte(numberSplitArr[0], ',')
    return numberSplitArr.join('.')
}

function deepClone(target) {

	if (typeof target !== 'object' || target === null) {
		return target
	}

	const cloneResult = Array.isArray(target) ? [] : {}

	for (const key in target) {
		if (Object.prototype.hasOwnProperty.call(target, key)) {
			
			const value = target[key]
			
			if (typeof value === 'object' && value !== null) {
				cloneResult[key] = deepClone(value)
			} else {
				cloneResult[key] = value
			}
		}
	}
	
	return cloneResult
}

export {
	pagination,
	ruleOfThirds,
	isFloat,
	stringReverse,
	deepClone
}
