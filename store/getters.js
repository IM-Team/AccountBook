
const findAccount = (state) => {
    return (id, account_type) => {
        const type = account_type == 1 ? 'capitals' : 'credits'
        return state.accounts[type].find(item => item.id == id)
    }
}

const findBillOfId = (state) => {
    return (id) => {

        const pos = []

        state.turnoverData.turnovers.some((turnover, turnoverIndex) => {
            const index =  turnover.list.findIndex(item => item.id === id)

            if (index !== -1) {
                pos.push(turnoverIndex, index)
            }
        
            return false
        })

        return pos
    }
}

const currentAccountBookId = (state) => {
    return state.currentAccountBook.id
} 

export default {
    findAccount,
    findBillOfId,
    currentAccountBookId
}
