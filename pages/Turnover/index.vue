<template>
	<view class="turnover-container">
		<turnover-header
            :income="income"
            :expense="expense"
            :surplus="surplus" />

		<turnover-list :turnovers="turnoverData.turnovers" />

        <bill-detail @edit="onEdit" />
	</view>
</template>

<script>
    
	import TurnoverHeader   from '@/components/Turnover/TurnoverHeader'
	import TurnoverList     from '@/components/Turnover/TurnoverList'
    import BillDetail	    from '@/components/BillDetail'
    import { ruleOfThirds, deepClone } from '@/utils/utils.js'
    import { mapState } from 'vuex'
    import TurnoverModel from '@/model/TurnoverModel'

    import {
        TURNOVER_DATA,
        IS_FROM_BILLDETAIL
    } from '@/store/mutation-types'
	
    import res from './data.json'

	export default {
		name: 'Turnover',
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

            const turnoverModel = new TurnoverModel()

            turnoverModel.getTurnoverList({
				year: 2020,
				month: 11
			}).then(res => {

				const turnoverList = res.data.billsOfDayList.map(turnovers => {
					const day = turnovers.time.split('-')[2] * 1
					return {
						day: day,
						list: turnovers.billList
					}
				})

				this.$store.commit(TURNOVER_DATA, {
					year: 2020,
					month: 10,
					turnovers: turnoverList
                })

                this.calcIncomeAndExpense()
			})
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
            }
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
