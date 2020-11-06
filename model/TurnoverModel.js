import HttpServe from '../utils/HttpServe'

class TurnoverModel extends HttpServe {
    
    getTurnoverList({ year, month, accountBookId = 1 }) {
        return this.request({
            url: `/bill/all/${year}/${month}`,
            data: { bookId: accountBookId },
            method: 'GET'
        })
    }

    postBill(data, id) {
        return this.request({
            url: '/bill?bookId=' + id,
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
