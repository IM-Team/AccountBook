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
					:accounts="capitalAccount"
					account_type=1
				/>
			</view>
			<view class="account-group">
				<account-group
					title="信用账户"
					:accounts="creditAccount"
					account_type=2
				/>
			</view>
		</view> 
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	import AccountGroup from '../../components/AccountGroup'
	
    import { accountMapMixin } from '@/utils/mixins'
	import { ruleOfThirds } from '@/utils/utils'
    import { ACCOUNTS } from '@/store/mutation-types'
	
	import { accounts } from './Account.json'
	
	export default {     
		name: 'Account',
		mixins: [accountMapMixin],
		created() {
			// 初始化数据inmo-vuex
			this.initAccountData();
		},
		data() {
			return {
				capitalAccount: [],	// 资金账户
				creditAccount: []	// 信用账户
			}
        },
		computed: {
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
				return total;
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
				console.log("您太穷了...pi");
			},
			initAccountData() {

                const tmpAcount = {
                    capitals: [],
                    credits: []
                }

				for(const account of accounts.list) {
					
                    const accountType = account.account_type;
					
                    if (accountType === 1) {
                        tmpAcount.capitals.push(account);
                    } else if (accountType === 2) {
                        tmpAcount.credits.push(account);
                    }
                }

                this.$store.commit(ACCOUNTS, tmpAcount);
                this.capitalAccount = this.$store.state.accounts.capitals;
                this.creditAccount = this.$store.state.accounts.credits;
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
		margin: 10rpx 0 16rpx;
		font-size: 48rpx;
		color: #188AFF;
		font-weight: 100;
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