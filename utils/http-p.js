import config from './config.js'
import store from '../store'

class HTTP {
	
	request({ url, method = "GET", data = {}, header = {} }) {

        if (!url.startsWith('/user/')) {
            header = {
                ...header,
                'Authorization': store.state.token
            }
        }

		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, method, data, header)
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
					reject(res.data)
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
			duration: 2000
		})
	}
}

export default HTTP
