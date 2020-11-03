import {
    CATEGORY,
    ACCOUNT_BOOKS,
    CURRENT_ACCOUNT_BOOK
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
    }
}

export default actions
