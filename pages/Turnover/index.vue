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
    import TurnoverModel from '@/model/TurnoverModel'
    import { turnoverMixin } from '@/utils/mixins'

    import {
        TURNOVER_DATA,
        IS_FROM_BILLDETAIL,
        IS_SHOW_BILLDETAIL,
        REMOVE_TURNOVER_ITEM
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
                surplus: 0,
                isShowBillDetail: false,
                turnoverInfo: {},
                billDetailData: {}
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
             * 防止切换 tab 造成频繁请求
             */
            if (Object.keys(this.$store.state.turnoverData).length > 0) {
                this.calcIncomeAndExpense()
                return
            }

            const date = new Date()
            this.switchTurnoverDate(date.getFullYear(), date.getMonth() + 1)
        },
        computed: {
            ...mapState(['turnoverData'])
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
				
				this.income = _income
                this.expense = _expense
                this.surplus = (_income - _expense).toFixed(2)
            },
            onEdit() {
                this.$store.commit(IS_FROM_BILLDETAIL, true)
                
				uni.navigateTo({ url: '/pages/Add/index' })
            },
            onDelete(id) {
                turnoverModel.deleteBill(id).then(res => {
                    this.removeBill(id)
                })
            },
            removeBill(id) {
                this.$store.commit(IS_SHOW_BILLDETAIL, false)

                const pos = this.$store.getters.findBillOfId(id)
                this.$store.commit(REMOVE_TURNOVER_ITEM, {turnoverIndex: pos[0], itemIndex: pos[1]})
            }
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
