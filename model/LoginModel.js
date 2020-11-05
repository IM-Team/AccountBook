import HTTP from '@/utils/http-p'

class LoginModel extends HTTP {
    login(code) {
        return this.request({
            url: '/user/login?code=' + code,
            method: 'POST'
        })
    }

    getToken(code) {
        return this.request({
            url: '/user?code=' + code,
            method: 'POST'
        })
    }
}

export default LoginModel
