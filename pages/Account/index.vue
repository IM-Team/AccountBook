<template>
	<view class="acount-container">
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
					<view class="trend-btn">资金趋势</view>
					<view class="add_account-btn" @click="onAddAccount">添加账户</view>
				</view>
			</im-cell>
		</view>  
		<!--end header  -->		
		
		
		
		<view class="account-group-wrap">
			<account-group 
				title="资金账户"
				:accounts="accounts.capital"
			/>
			<account-group 
				title="信用账户"
				:accounts="accounts.credit"
			/>
		</view> 
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	import AccountGroup from '../../components/AccountGroup'
	 
	import { accounts } from './Account.json'
	
	export default {     
		name: 'Account',
		data() {
			return {
				accounts
			}
		},
		created() {
			// console.log("123");
			// setTimeout(() => {
			// 	uni.getStorage({
			// 		key: "account",
			// 		success: res => {
			// 			console.log(res);
						
			// 			// this.accounts
			// 		}
			// 	})
			// }, 300);
		},
		methods: {
			onAddAccount() {
				uni.navigateTo({
					url: '/pages/AddAccount/index?'
				})
			}
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
	}
	
	.money .total-title {
		color: #999;
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	
	/* heder the button widge style */
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
</style>
