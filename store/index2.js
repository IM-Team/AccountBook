import Vue from 'vue'

// 需要监听的数据
const state = Vue.observable({
    billDetail: null,
    isFromBillDetail: false,
    turnoverData: null,
	accounts: {
		capitals: [],
		credits: []
    },
    accountBooks: [],
    currentAccountBook: {},
    turnoverTapData: {}
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
	},
	setCapitalAccountAttribute(option) {
		const index = state.accountData.capitalAccount.findIndex(item => item.id == option.id);
		return state.accountData.capitalAccount[index] = option;
	},
	setCreditAccountAttribute(option) {
		const index = state.accountData.creditAccount.findIndex(item => item.id == option.id);
		return state.accountData.creditAccount[index] = option;
	},
	pushCreditAccount(data) {
		return state.accountData.creditAccount.push(data);
    },
	popAccount(type, data) {
		const index = state.accountData[type].findIndex(item => item.id == data.id);
		return state.accountData[type].splice(index, 1);
	},
  
    setAccountBooks(data) {
        return Vue.set(state, 'accountBooks', data)
    },
	setCurrentAccountBook(accountBook) {
		
		Vue.set(state.currentAccountBook, 'id', accountBook.id)
		Vue.set(state.currentAccountBook, 'name', accountBook.name)
		Vue.set(state.currentAccountBook, 'color', [...accountBook.color])

		return state.currentAccountBook
    },
    setTurnoverTapData(data) {
        
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                Vue.set(state.turnoverTapData, key, data[key])
            }
        }

        return state.turnoverTapData
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
    },
    getAccountBooks() {
        return state.accountBooks
    },
	getCurrentAccountBook() {
		return state.currentAccountBook
    },
    getTurnoverTapData() {
        return state.turnoverTapData
    }
}

export default {
    state,
    mutations,
    getters
}
