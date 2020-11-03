<template>
	<view class="acount-container">
		<!-- *start* account-header -->
		<view class="account-header">
			<im-cell>
				<view class="money" slot="title">
					<text class="worth-title">净资产</text>
					<view class="worth-value">{{ formattingBalance(accountTotal) || "0.00" }}</view>
					<view>
						<text class="total-title">资金总额</text>
						<text class="total-value">{{ formattingBalance(capitalTotal) || "0.00"  }}</text>
					</view>
					<view>
						<text class="total-title">负债总额</text>
						<text class="total-value">{{ formattingBalance(creditTotal) || "0.00"  }}</text>
					</view>
				</view>
				<view class="header-btn-wrap" slot="content">
					<view class="trend-btn" @click="onCapitalTrend">资金趋势</view>
					<view class="add_account-btn" @click="onAddAccount">添加账户</view>
				</view>
			</im-cell>
		</view>  
		<!-- *end* account-header -->
		
		<view class="account-group-wrap">
			<view class="account-group">
				<account-group
					title="资金账户"
					:accounts="accounts.capitals"
					account_type=1
				/>
			</view>
			<view class="account-group">
				<account-group
					title="信用账户"
					:accounts="accounts.credits"
					account_type=2
				/>
			</view>
		</view> 
	</view>
</template>

<script>
	// components
	import ImCell from '@/components/common/ImCell'
	import AccountGroup from '../../components/AccountGroup'
	// methods
    import { accountMapMixin } from '@/utils/mixins'
	import { ruleOfThirds } from '@/utils/utils'
    import { ACCOUNTS } from '@/store/mutation-types'
	// datas
	import { accounts } from './Account.json'
    import AccountModel from '../../model/AccountModel.js'
    
    import { mapState } from 'vuex'
	
	export default {     
		name: 'Account',
		mixins: [accountMapMixin],
		data() {
			return {
				capitalAccount: [],	// 资金账户
				creditAccount: []	// 信用账户
			}
        },
		computed: {
            ...mapState(['accounts']),
			capitalTotal() {
				return this.calcTotal(this.capitalAccount);
			},
			creditTotal() {
				return this.calcTotal(this.creditAccount);
			},
			accountTotal() {
				return this.capitalTotal - this.creditTotal;
			}
		},
		components: {
			ImCell,
			AccountGroup
		},
		methods: {
			calcTotal(accounts) {
				let total = 0;
				accounts.forEach(item => total += Number(item.balance))
				return total.toFixed(2);
			},
			formattingBalance(number) {
				return ruleOfThirds(number);
			},
			// 点击添加账户按钮处理事件
			onAddAccount() {
				uni.navigateTo({ url: '/pages/AddAccount/index' });
			},
			// 点击资金趋势按钮处理事件
			onCapitalTrend() {
				uni.showModal({
					title: "提示",
					content: "过于贫穷，没资格查看",
					showCancel: false,
					confirmText: "对不起"
				});
			}
		}
	}
</script>

<style scoped>
	.acount-container {
		padding: 32rpx;
	}
	
	.money .worth-title {
		font-size: 32rpx;
	}
	.money .worth-value {
		width: 400rpx;
		margin: 10rpx 0 16rpx;
		font-size: 48rpx;
		font-weight: 100;
		color: #188AFF;
		overflow-x: scroll;
		
	}
	
	.money .total-title {
		color: #999;
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	
	/* header the button widge style */
	.header-btn-wrap {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.header-btn-wrap .trend-btn,
	.header-btn-wrap .add_account-btn {
		display: inline-flex;
		align-items: center;
		height: 54rpx;
		padding: 16rpx 32rpx;
		border-radius: 10px;
		color: #fff;
		background-color: #188AFF;
	}
	.header-btn-wrap .add_account-btn {
		margin-top: 32rpx;
		background-color: #FF4949;
	}
	.account-group-wrap .account-group {
		margin-top: 32rpx;
	}
</style>