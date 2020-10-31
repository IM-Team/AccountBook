import Vue from 'vue'
import {
    TURNOVER_DATA,
    ACCOUNT_BOOKS,
    CURRENT_ACCOUNT_BOOK,
    ADD_ACCOUNT_BOOK,
    BILL_DETAIL,
    IS_FROM_BILLDETAIL,
    IS_SHOW_BILLDETAIL,
    UPDATE_TURNOVER_ITEM,
    REMOVE_TURNOVER_ITEM,
    REMOVE_TURNOVER,
    PUSH_TURNOVER_ITEM,
    UNSHIFT_TURNOVER,

    ACCOUNTS,
    REMOVE_ACCOUNT,
    ADD_ACCOUNT,
    UPDATE_ACCOUNT
} from './mutation-types'

const mutations = {
    [TURNOVER_DATA](state, data) {
        state.turnoverData = { ...data }
    },
    [ACCOUNT_BOOKS](state, accountBooks) {
        state.accountBooks = [ ...accountBooks ]
    },
    [CURRENT_ACCOUNT_BOOK](state, current) {
        state.currentAccountBook = { ...current }
    },
    [ADD_ACCOUNT_BOOK](state, accountBook) {
        state.accountBooks.push(accountBook)
    },
    [BILL_DETAIL](state, billDetail) {
        state.billDetail = { ...billDetail }
    },
    [IS_FROM_BILLDETAIL](state, is) {
        state.isFromBillDetail = is
    },
    [IS_SHOW_BILLDETAIL](state, isShow) {
        state.isShowBillDetail = isShow
    },
    [UPDATE_TURNOVER_ITEM](state, { turnoverIndex, itemIndex, data }) {
        Vue.set(state.turnoverData.turnovers[turnoverIndex].list, itemIndex, data)
    },
    [REMOVE_TURNOVER_ITEM](state, { turnoverIndex, itemIndex }) {
        Vue.delete(state.turnoverData.turnovers[turnoverIndex].list, itemIndex)
    },
    [REMOVE_TURNOVER](state, index) {
        Vue.delete(state.turnoverData.turnovers, index)
    },
    [PUSH_TURNOVER_ITEM](state, { turnoverIndex, data }) {
        state.turnoverData.turnovers[turnoverIndex].list.push(data)
    },
    [UNSHIFT_TURNOVER](state, data) {
        state.turnoverData.turnovers.unshift(data)
    },


    [ACCOUNTS](state, data) {
        state.accounts = { ...data }
    },
    [REMOVE_ACCOUNT](state, { account_type, id }) {
        const type = account_type == 1 ? 'capitals' : 'credits'
        const index = state.accounts[type].findIndex(item => item.id == id)

        Vue.delete(state.accounts[type], index)
    },
    [ADD_ACCOUNT](state, { account_type, data }) {
        const type = account_type == 1 ? 'capitals' : 'credits'
        
        state.accounts[type].push(data)
    },
    [UPDATE_ACCOUNT](state, { account_type, id, data }) {
        const type = account_type == 1 ? 'capitals' : 'credits'
        const index = state.accounts[type].findIndex(item => item.id == id)

        Vue.set(state.accounts[type], index, data)
    }
}

export default mutations
