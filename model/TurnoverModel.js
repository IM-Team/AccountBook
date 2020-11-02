import HTTP from '../utils/http-p.js'

class TurnoverModel extends HTTP {
    
    getTurnoverList({ year, month, accountBookId = -1 }) {
        return this.request({
            url: `/bill/all/${year}/${month}`,
            data: accountBookId !== -1 ? { bookId: accountBookId } : {},
            method: 'GET'
        })
    }

    postBill(data) {
        return this.request({
            url: '/bill',
            method: 'POST',
            data: data,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })
    }

}

export default TurnoverModel
