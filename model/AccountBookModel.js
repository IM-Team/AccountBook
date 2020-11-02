import HTTP from '../utils/http-p'

class AccountBook extends HTTP {

    getAccountBooks() {
        return this.request({
            url: '/book',
            method: 'GET'
        })
    }

    getCategory(id) {
        return this.request({
            url: '/category?bookId=' + id,
            method: 'GET'
        })
    }

}

export default AccountBook
