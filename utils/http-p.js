import config from './config.js'

class HTTP {
	
	request({ url, method = "GET", data = {}, header = {} }) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, method, data, header = {})
		})
    }
	
	_request(url, resolve, reject, method, data, header) {
		uni.request({
			url: config.baseURL + url,
			method: method,
            data: data,
            header: header,
			success: (res) => {

				const code = res.statusCode.toString()
				if (code.startsWith(2)) {
					resolve(res.data)
				} else {
					reject('请求失败')
				}

			},
			fail: (err) => {
				reject(err)
				this._showError('网络连接失败')
			}
		})
	}

	_showError(message) {
		uni.showToast({
			title: message || '请求失败',
			icon: 'none',
			mask: true,
			duration: 1000
		})
	}
}

export default HTTP
