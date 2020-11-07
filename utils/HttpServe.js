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

            // 校验过期情况
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
        } else if (!wxLogin) {
            uni.showToast({
                title: '请登录',
                icon: 'none',
                duration: 2000
            })
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

    static getSetting() {
        return new Promise((resolve, reject) => {
            uni.getSetting({
                success: resolve,
                fail: reject
            })
        })
    }

    static async isUserAuthorization() {
        const res = await HttpServe.getSetting()

        if (res.authSetting['scope.userInfo']) {
            return true
        }

        return false
    }
}

export default HttpServe
