import HTTP from './http-p'
import store from '../store'
import {
    TOKEN
} from '../store/mutation-types'

class HttpServe extends HTTP {

    async request({ url, method = "GET", data = {}, header = {} }) {

        if (!url.startsWith('/user/')) {
            header = {
                ...header,
                'Authorization': store.state.token
            }
        }

        try {
            return await this.httpRequest({ url, method, data, header })
        } catch (error) {
            
            this.params = {
                url,
                method,
                data,
                header
            }

            return this._validExpire(error)
        }
    }

    async _validExpire(error) {
        
        const code = error.statusCode
        const wxLogin = error.errMsg.endsWith('ok')

        if (code === 401 && wxLogin) {
            const reqTokenRes = await this._applyToken()
            store.commit(TOKEN, reqTokenRes.data.token)

            return this._reRequset()
        }

        return error
    }

    _applyToken() {
        return this.request({
            url: this.params.url,
            method: this.params.method
        })
    }
    
    _reRequset() {
        return this.request(this.params)
    }

    static login() {
        return new Promise((resolve, reject) => {
			uni.login({
                success: resolve,
                fail: reject
            })
		})
    }

    static async isLogin() {
        const res = await HttpServe.login()
        return res.errMsg.endsWith('ok')
    }
}

export default HttpServe
