import HttpServe from '../utils/HttpServe'

class LoginModel extends HttpServe {
    
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
