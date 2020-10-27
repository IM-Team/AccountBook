import Vue from 'vue'

// 需要监听的数据
const state = Vue.observable({
    billDetail: null,
    isFromBillDetail: false,
    turnoverData: null,
	accountData: {
		capitalAccount: [],
		creditAccount: []
	}
})

// 所有修改的监听数据都要通过 mutations 修改
const mutations = {
    setBillDetail(detail) {
        return Vue.set(state, 'billDetail', detail)
    },
    setIsFromBillDetail(is) {
        return state.isFromBillDetail = is
    },
    setTurnoverData(data) {
        return Vue.set(state, 'turnoverData', data)
    },
	
	// account Data
	setCapitalAccount(data) {
		return state.accountData.capitalAccount = data;
	},
	setCreditAccount(data) {
		return state.accountData.creditAccount = data;
	},
	pushCapitalAccount(data) {
		return state.accountData.capitalAccount.push(data);
	},
	pushCreditAccount(data) {
		return state.accountData.creditAccount.push(data);
	}
	
}

// 所有获取监听数据都要通过 getters 获取
const getters = {
    getBillDetail() {
        return state.billDetail
    },
    getIsFromBillDetail() {
        return state.isFromBillDetail
    },
    getTurnoverData() {
        return state.turnoverData
    },
	getAccountData() {
		return state.accountData;
	}
}

export default {
    state,
    mutations,
    getters
}
