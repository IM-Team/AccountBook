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
            
			console.log(error);
			
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
		const wxSetting = await HttpServe.getSetting()
        const wxLogin = wxSetting.authSetting['scope.userInfo']

		// 登录失效
        if (code === 401 && wxLogin) {
			const wxCode = (await HttpServe.login()).code
            const reqTokenRes = await this._applyToken(wxCode)
            store.commit(TOKEN, reqTokenRes.data.token)

            return this._reRequset()
        }
		// 没有登录
		else if (!wxLogin) {
            uni.showToast({
                title: '请登录',
                icon: 'none',
                duration: 2000
            })
        }

        return error
    }

	// 申请 token
    _applyToken(code) {
        return this.request({
            url: '/user/login?code=' + code,
            method: 'POST'
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
