import HTTP from '../utils/http-p'

class AccountBook extends HTTP {

    getAccountBooks() {
        return this.request({
            url: '/book',
            method: 'GET'
        })
    }

}

export default AccountBook
