import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

// import turnoverModule from './modules/turnover'

Vue.use(Vuex)

const state = {
    turnoverData: {},
    accountBooks: {},
    currentAccountBook: {},
    isFromBillDetail: false,
    isShowBillDetail: false,
    billDetail: {},
    accounts: {
		capitals: [],
		credits: []
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
