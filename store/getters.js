
const findAccount = (state) => {
    return (id, account_type) => {
        const type = account_type == 1 ? 'capitals' : 'credits'
        return state.accounts[type].find(item => item.id == id)
    }
}

export default {
    findAccount
}
