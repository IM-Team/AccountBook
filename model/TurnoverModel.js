import HTTP from '../utils/http-p.js'

class TurnoverModel extends HTTP {
    
    getTurnoverList({ year, month, accountBookId = 1 }) {
        return this.request({
            url: `/bill/all/${year}/${month}`,
            data: { bookId: accountBookId },
            method: 'GET'
        })
    }

    postBill(data) {
        return this.request({
            url: '/bill',
            method: 'POST',
            data: data,
            header: {
                "content-type": "application/json"
            }
        })
    }

    deleteBill(id) {
        return this.request({
            url: '/bill?billId=' + id,
            method: 'DELETE'
        })
    }
}

export default TurnoverModel
