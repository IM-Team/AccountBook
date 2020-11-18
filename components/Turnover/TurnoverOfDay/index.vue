<template>
	<view class="turnover_list_item-container">
		<view class="header">
			<view><text class="day">{{ formatDay(dayData.day) }}</text> 日</view>
			<view>
				<text v-if="amount.income">收入 {{ amount.income }}</text>
				<text class="expenses" v-if="amount.expense">支出 {{ amount.expense }}</text>
			</view>
		</view>
		<view class="cell"
			v-for="item in dayData.list"
			:key="item.id"
			@click="onTap(item)">
			<im-cell
				:title="item.billCategory.name"
				:icon="item.billCategory.icon"
                :color="item.billCategory.color"
				:content="ruleOfThirds(item.amount)" />
		</view>
	</view>
</template>

<script>
	
    import ImCell from '@/components/common/ImCell'
    import {
        BILL_DETAIL,
        IS_SHOW_BILLDETAIL
    } from '@/store/mutation-types'
	
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
                amount: {
                    income: '',
				    expense: ''
                }
			}
		},
		watch: {
			dayData() {
                this.countPrice()
            }
		},
		created() {
			this.countPrice()
		},
		methods: {
			ruleOfThirds,
			onTap(data) {
                this.$store.commit(BILL_DETAIL, data)
                this.$store.commit(IS_SHOW_BILLDETAIL, true)
			},
			countPrice() {

                let _income = 0, _expense = 0
				this.dayData.list.forEach(item => {
					if (item.type === 1) {
						_income += item.amount * 1
					} else if (item.type === 2) {
						_expense += item.amount * 1
					}
                })

				this.amount.income = ruleOfThirds(_income.toFixed(2))
                this.amount.expense = ruleOfThirds(_expense.toFixed(2))
            },
            formatDay(day) {
                return day > 9 ? day : '0' + day
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
		color: #aaa;
	}
	
	.expenses {
		margin-left: 20rpx;
    }
    
	.cell {
		margin-bottom: 16rpx;
    }
    
    .day {
        font-size: 36rpx;
        color: #2B303B;
    }

</style>
