import {
    CATEGORY,
    ACCOUNT_BOOKS,
    CURRENT_ACCOUNT_BOOK,
    ACCOUNTS,
    TURNOVER_DATA
} from './mutation-types'

const actions = {
    category({ commit }, data) {
        commit(CATEGORY, data)
    },
    accountBooks({ commit }, data) {
        commit(ACCOUNT_BOOKS, data)
    },
    currentAccountBook({ commit }, data) {
        commit(CURRENT_ACCOUNT_BOOK, data)
    },
    account({ commit }, data) {
        commit(ACCOUNTS, data)
    },
    turnoverData({ commit }, data) {
        commit(TURNOVER_DATA, data)
    }
}

export default actions
