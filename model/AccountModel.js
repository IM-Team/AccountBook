import HttpServe from '../utils/HttpServe'

class AccountModel extends HttpServe {
	
	getAccountList(book_id) {
		return this.request({
			url: '/account',
			data: { bookId: book_id },
			method: 'GET'
		});
	}
	
	createAccount(account) {
		return this.request({
			url: '/account',
			data: account,
			method: 'POST',
			header: {
			    "content-type": "application/x-www-form-urlencoded"
			}
		});
	}
	
	modifyAccount(account) {
		return this.request({
			url: '/account',
			data: account,
			method: 'POST',
			header: {
			    "content-type": "application/x-www-form-urlencoded"
			}
		});
	}
	
	removeAccount(id) {
		return this.request({
			url: `/account?accountId=${id}`,
			method: 'DELETE',
			header: {
			    "content-type": "text/plain;charset=UTF-8"
			}
		});
	}
}

export default AccountModel;