<template>
	<view class="turnover-container">
		<turnover-header
            :income="income"
            :expense="expense"
            :surplus="surplus" />
		<turnover-list :turnovers="data.turnovers" />
	</view>
</template>

<script>
	
	import TurnoverHeader from '@/components/Turnover/TurnoverHeader'
	import TurnoverList from '@/components/Turnover/TurnoverList'
    import res from './data.json'
	import { ruleOfThirds } from '@/utils/utils.js'
	
	export default {
		name: 'Turnover',
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
			TurnoverList
        },
        watch: {
            data: {
                handler() {
                    this.calcIncomeAndExpense()
                },
                deep: true
            }
        },
		created() {
            this.data = this.$store.mutations.setTurnoverData(res.data)
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
                this.surplus = (_income - _expense).toFixed(2)
			}
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
