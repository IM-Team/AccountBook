import TurnoverModel from '@/model/TurnoverModel'
import AccountBookModel from '@/model/AccountBookModel'
import AccountModel from '@/model/AccountModel'

import {
    TURNOVER_DATA
} from '@/store/mutation-types'

const accountBookModel = new AccountBookModel()
const accountModel = new AccountModel()

const accountMapMixin = {
	data() {
		return {
			mixin_accounts: {
				1: {
                    type: 1,
					name: "支付宝",
					icon: "icon-zhifubao",
					account_type: 1,
					color: "#1678ff"
				},
				2: {
                    type: 2,
					name: "微信",
					icon: "icon-weixin",
					account_type: 1,
					color: "#03d969"
				},
				3: {
                    type: 3,
					name: "银行卡",
					icon: "icon-yinhangka",
					account_type: 1,
					color: "#34495e"
				},
				4: {
                    type: 4,
					name: "现金",
					icon: "icon-xianjin",
					account_type: 1,
					color: "#ffb83f"
				},
				5: {
                    type: 5,
					name: "白条",
					icon: "icon-baitiao",
					account_type: 2,
					color: "#DE231C"
				},
				6: {
                    type: 6,
					name: "花呗",
					icon: "icon-huabei",
					account_type: 2,
					color: "#1678ff"
				},
				7: {
                    type: 7,
					name: "信用卡",
					icon: "icon-xinyongka",
					account_type: 2,
					color: "#27ae60"
				}
			}
		}
	}
}

const turnoverMixin = {
    methods: {
        async switchTurnoverDate(year, month, accountBookId, isCommit = true) {

            // 防止没有传递账本 id
            if (!accountBookId) {
                accountBookId = this.$store.getters.currentAccountBookId
            }

            const turnoverModel = new TurnoverModel()
            const res = await turnoverModel.getTurnoverList({ year, month, accountBookId })

            const turnoverList = res.billsOfDayList.map(turnovers => {
                const day = turnovers.time.split('-')[2] * 1
                return {
                    day: day,
                    list: turnovers.billList
                }
            })

            if (!isCommit) {
                return turnoverList
            } else {
                this.$store.commit(TURNOVER_DATA, {
                    year,
                    month,
                    turnovers: turnoverList
                })
            }
        }
    }
}

const initGlobalDataMixin = {
    methods: {
        initGlobalData() {
            accountBookModel.getAccountBooks().then(res => {
                this.initAccountBook(res)
                this.$store.dispatch('currentAccountBook', this.$store.state.accountBooks[0])

                const abId = res[0].id

                return Promise.all([
                    accountBookModel.getCategory(abId),
                    accountModel.getAccountList(abId)
                ])
            }).then((res) => {
                this.initCategory(res[0])
                this.initAccount(res[1])
            })
        },
        initCategory(res) {
            const tmpCate = { 1: [], 2: [] }
            res.forEach(item => tmpCate[item.type].push(item))
            
            this.$store.dispatch('category', tmpCate)
        },
        initAccountBook(res) {
            res.forEach(item => item.color = item.color.split(','))
            
            this.$store.dispatch('accountBooks', res)
        },
        initAccount(res) {
            
            const tmpAcount = {
                capitals: [],
                credits: []
            }

            for(const account of res.accountList) {
                if (account.categoryId === 1) {
                    tmpAcount.capitals.push(account);
                } else if (account.categoryId === 2) {
                    tmpAcount.credits.push(account);
                }
            }

            this.$store.dispatch('account', tmpAcount)
        }
    }
}


export {
    accountMapMixin,
    turnoverMixin,
    initGlobalDataMixin
}
