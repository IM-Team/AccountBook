<template>
	<view class="turnover-container">
		<turnover-header
            :income="income"
            :expense="expense"
            :surplus="surplus" />

		<turnover-list :turnovers="turnoverData.turnovers" />

        <bill-detail @edit="onEdit" @delete="onDelete" />
	</view>
</template>

<script>
    
	import TurnoverHeader   from '@/components/Turnover/TurnoverHeader'
	import TurnoverList     from '@/components/Turnover/TurnoverList'
    import BillDetail	    from '@/components/BillDetail'
    import { ruleOfThirds, deepClone } from '@/utils/utils.js'
    import { mapState } from 'vuex'
    import { turnoverMixin } from '@/utils/mixins'
    import TurnoverModel from '@/model/TurnoverModel'

    import {
        TURNOVER_DATA,
        IS_FROM_BILLDETAIL,
        IS_SHOW_BILLDETAIL,
        REMOVE_TURNOVER_ITEM,
        INC_ACCOUNT,
        DEC_ACCOUNT,
    } from '@/store/mutation-types'
	
    const turnoverModel = new TurnoverModel()

	export default {
        name: 'Turnover',
        mixins: [turnoverMixin],
		data() {
			return {
				data: {},
				income: 0,
                expense: 0,
                surplus: 0
			}
		},
		components: {
			TurnoverHeader,
            TurnoverList,
            BillDetail
        },
        watch: {
            turnoverData: {
                handler() {
                    this.calcIncomeAndExpense()
                },
                deep: true
            }
        },
		created() {

            /**
             * 如果有数据, 防止切换 tab 造成频繁请求
             */
            if (Object.keys(this.$store.state.turnoverData).length > 0) {
                this.calcIncomeAndExpense()
                return
            }

            // 登录状态，没有数据
            if (this.$store.state.isLogin) {
                const date = new Date()
                this.switchTurnoverDate(date.getFullYear(), date.getMonth() + 1)
            }

            // 切换账本
            const unWatch = this.$watch('currentAccountBook', (v) => {
                unWatch()
                const date = new Date()
                this.switchTurnoverDate(date.getFullYear(), date.getMonth() + 1)
            })
            
        },
        computed: {
            ...mapState(['turnoverData', 'currentAccountBook', 'isLogin'])
        },
		methods: {
			calcIncomeAndExpense() {
				let _income = 0, _expense = 0
				
				this.turnoverData.turnovers.forEach(dayTurn => {
					dayTurn.list.forEach(item => {
						if (item.type === 1)
							_income += (item.amount * 1)
						else if (item.type === 2)
							_expense += (item.amount * 1)
					})
				})
				
				this.income = _income.toFixed(2)
                this.expense = _expense.toFixed(2)
                this.surplus = (_income - _expense).toFixed(2)
            },
            onEdit() {
                this.$store.commit(IS_FROM_BILLDETAIL, true)
                
				uni.navigateTo({ url: '/pages/Add/index' })
            },
            onDelete(id) {
                turnoverModel.deleteBill(id).then(res => {
                    this.removeBill(id)
                    this.changeAccount()
                })
            },
            removeBill(id) {
				this.$store.commit(IS_SHOW_BILLDETAIL, false)
                const pos = this.$store.getters.findBillOfId(id)
                this.$store.commit(REMOVE_TURNOVER_ITEM, {turnoverIndex: pos[0], itemIndex: pos[1]})
            },
            changeAccount() {

                const accounts = this.$store.state.accounts
                const billDetail = this.$store.state.billDetail
                const thatAccount = billDetail.account.name
                const { amount, type } = billDetail

                let acType = 1
                let index = accounts['capitals'].findIndex(item => item.name === thatAccount)

                if (index === -1) {
                    acType = 2
                    index = accounts['credits'].findIndex(item => item.name === thatAccount)
                }

                this.$store.commit(
                    type === 1 ? DEC_ACCOUNT : INC_ACCOUNT, {
                    account_type: acType,
                    index,
                    amount: parseFloat(amount)
                })

            }
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
