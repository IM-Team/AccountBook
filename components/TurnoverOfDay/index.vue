<template>
	<view class="turnover_list_item-container">
		<view class="header">
			<view>{{ dayData.day }} 日</view>
			<view>
				<text v-if="income">收入 {{ income }}</text>
				<text class="expenses" v-if="expense">支出 {{ expense }}</text>
			</view>
		</view>
		<view class="cell"
			v-for="(item, index) in dayData.list"
			:key="index"
			@click="onTap(item)">
			<im-cell
				:title="item.name"
				icon="icon-canyin"
				:content="ruleOfThirds(item.price)" />
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	import { ruleOfThirds } from '@/utils/utils.js'
	
	export default {
		name: 'TurnoverOfDay',
		props: {
			dayData: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				income: 0,
				expense: 0
			}
		},
		created() {
			this.countPrice()
		},
		methods: {
			ruleOfThirds,
			onTap(data) {
				this.$root.showBillDetail(data)
			},
			countPrice() {
				let income = 0, expense = 0
				
				this.dayData.list.forEach(item => {
					// 统计收支情况 1: 收入 2: 支出
					if (item.turnover_type === 1) {
						income += item.price * 1
					} else if (item.turnover_type === 2) {
						expense += item.price * 1
					}
				})
				
				// 保留后面的小数
				income += ''
				income = income.indexOf('.') !== -1 ? income : income + '.00'
				
				expense += ''
				expense = expense.indexOf('.') !== -1 ? expense : expense + '.00'
				
				this.income = ruleOfThirds(income)
				this.expense = ruleOfThirds(expense)
			}
		},
		components: {
			ImCell
		}
	}
</script>

<style scoped>
	
	.header {
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #757575;
	}
	
	.expenses {
		margin-left: 20rpx;
	}

</style>
