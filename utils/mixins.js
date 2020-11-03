import TurnoverModel from '@/model/TurnoverModel'
import {
    TURNOVER_DATA
} from '@/store/mutation-types'

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
					color: "#AA00FF"
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
					color: "#00a65a"
				}
			}
		}
	}
}

const turnoverMixin = {
    methods: {
        switchTurnoverDate(year, month, accountBookId = 1) {

            const turnoverModel = new TurnoverModel()
            turnoverModel.getTurnoverList({ year, month, accountBookId }).then(res => {

                const turnoverList = res.billsOfDayList.map(turnovers => {
                    const day = turnovers.time.split('-')[2] * 1
                    return {
                        day: day,
                        list: turnovers.billList
                    }
                })
        
                this.$store.commit(TURNOVER_DATA, {
                    year,
                    month,
                    turnovers: turnoverList
                })
            }).catch((err) => {

                console.log(err)

                uni.showToast({
                    title: '服务器开了个小差',
                    icon: 'none',
                    duration: 2000
                })
            })
        }
    }
}

export {
    accountMapMixin,
    turnoverMixin
}
