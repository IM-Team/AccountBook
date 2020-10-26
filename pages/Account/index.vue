<template>
	<view class="acount-container">
		<!-- *start* account-header -->
		<view class="account-header">
			<im-cell>
				<view class="money" slot="title">
					<text class="worth-title">净资产</text>
					<view class="worth-value">19,000,084.00</view>
					<view>
						<text class="total-title">资金总额</text>
						<text class="total-value">1,600.00</text>
					</view>
					<view>
						<text class="total-title">负债总额</text>
						<text class="total-value">1,600.00</text>
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
			<account-group 
				title="资金账户"
				:accounts="capitalAccount"
			/>
			<account-group 
				title="信用账户"
				:accounts="creditAccount"
			/>
		</view> 
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	import AccountGroup from '../../components/AccountGroup'
	
	import { accounts } from './Account.json'
	// import { accountMapMixin } from '@/utils/mixins'

	
	export default {     
		name: 'Account',
		// mixins: [accountMapMixin],
		created() {
			const gData = getApp().globalData;

			// 分类资金账户和信用账户分别push到global
			for(let item of accounts.list) {
				if(item.account_type === 1) {
					gData.accountData.capitalAccount.push(item);
				} else {
					gData.accountData.creditAccount.push(item);
				}
			}
			// 关联global数据
			this.capitalAccount = gData.accountData.capitalAccount;
			this.creditAccount = gData.accountData.creditAccount;
		},
		data() {
			return {
				capitalAccount: [],	// 资金账户
				creditAccount: []	// 信用账户
			}
        },
		methods: {
			// 点击添加账户按钮处理事件
			onAddAccount() {
				uni.navigateTo({ url: '/pages/AddAccount/index' });
			},
			// 点击资金趋势按钮处理事件
			onCapitalTrend() {

			}
		},
		watch: {
			
		},
		components: {
			ImCell,
			AccountGroup
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
	.account-group .group-title {
		padding-bottom: 10rpx;
		font-size: 24rpx;
		color: #999;
	}

</style>
