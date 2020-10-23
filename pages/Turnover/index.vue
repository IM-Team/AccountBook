<template>
	<view class="turnover-container">
		<turnover-header :income="income" :expense="expense" />
		<turnover-list :turnovers="data.turnovers" />
	</view>
</template>

<script>
	
	import TurnoverHeader from '@/components/Turnover/TurnoverHeader'
	import TurnoverList from '@/components/Turnover/TurnoverList'
	import res from './data.json'
	
	export default {
		name: 'Turnover',
		data() {
			return {
				data: {},
				income: 0,
				expense: 0
			}
		},
		components: {
			TurnoverHeader,
			TurnoverList
        },
		created() {
            const gData = getApp().globalData
            gData.turnoverData = res.data

            this.data = gData.turnoverData
            this.calcIncomeAndExpense()

            // setTimeout(() => {
            //     gData.turnoverData.turnovers[0].list[0].price = 200000
            // }, 5000)

		},
		methods: {
			calcIncomeAndExpense() {
				let _income = 0, _expense = 0
				
				this.data.turnovers.forEach(dayTurn => {
					dayTurn.list.forEach(item => {
						// 收入 || 支出
						if (item.turnover_type === 1)
							_income += (item.price * 1)
						else if (item.turnover_type === 2)
							_expense += (item.price * 1)
					})
				})
				
				this.income = _income
				this.expense = _expense
			}
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
