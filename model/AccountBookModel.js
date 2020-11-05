import HTTP from '../utils/http-p'

class AccountBook extends HTTP {

    getAccountBooks() {
        return this.request({
            url: '/book',
            method: 'GET'
        })
    }

    postAccountBook(accountBook) {
        return this.request({
            url: '/book',
            method: 'POST',
            data: accountBook,
            header: {
                "content-type": "application/json"
            }
        })
    }

    getCategory(id) {
        return this.request({
            url: '/category?bookId=' + id,
            method: 'GET'
        })
    }

    postCategory(category) {
        return this.request({
            url: '/category',
            method: 'POST',
            data: category,
            header: {
                "content-type": "application/json"
            }
        })
    }
    
}

export default AccountBook
