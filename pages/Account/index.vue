<template>
	<view class="acount-container">
		<!-- *start* account-header -->
		<view class="account-header">
			<view class="total-wrap">
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
			<view class="add_account-btn"  @click="onAddAccount">
				<view class="iconfont icon-addaccount"></view>
			</view>
		</view>  
		<!-- *end* account-header -->
		
		<view class="account-group-wrap">
			<view v-if="accounts.capitals.length" class="account-group">
				<account-group
					title="资金账户"
					:accounts="accounts.capitals"
					account_type=1
				/>
			</view>
			<view v-if="accounts.credits.length" class="account-group">
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
				return this.calcTotal(this.accounts.capitals);
			},
			creditTotal() {
				return this.calcTotal(this.accounts.credits);
			},
			accountTotal() {
				return (this.capitalTotal - this.creditTotal).toFixed(2);
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
			}
		}
	}
</script>

<style scoped>
	.acount-container {
		padding: 32rpx;
	}
	.account-header {
		display: flex;
	}
	.total-wrap {
		flex: 1;
		padding: 32rpx;
		margin-right: 32rpx;
		border-radius: 10px;
		background-color: #fff;
	}
	.worth-title {
		font-size: 32rpx;
	}
	.worth-value {
		margin: 10rpx 0 16rpx;
		font-size: 48rpx;
		font-weight: 100;
		color: #188AFF;
		overflow-x: scroll;
	}
	.total-title {
		font-size: 28rpx;
		margin-right: 10rpx;
		color: #999;
	}
	
	/* header the button widge style */
	.add_account-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 180rpx;
		border-radius: 10px;
		background-color: #fff;
	}
	.add_account-btn .iconfont {
		font-size: 66rpx;
		/* color: #188AFF */
		/* color: #c2c2c2; */
		color: #FF4949;
	}
	.account-group-wrap .account-group {
		margin-top: 32rpx;
	}
</style>