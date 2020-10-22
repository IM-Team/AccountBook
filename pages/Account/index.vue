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
		</view>  <!--end header  -->		
		
		
		
		<view class="account-group-wrap">
			<view class="account-group">
				<view class="group-title">资金账户</view>
				<im-cell
					v-for="(item, index) in accounts.capital.list"
					:icon="item.icon"
					:title="item.name"
					:content="item.balance"
					:key="index" 
					@click.native="handleAccount(item)"
				/>
			</view>
			<view class="account-group">
				<view class="group-title">信用账户</view>
				<im-cell
					v-for="(item, index) in accounts.credit.list"
					:icon="item.icon"
					:title="item.name"
					:content="item.balance"
					:key="index" 
					@click.native="handleAccount(item)"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	import { data } from './Account.json'
	
	export default {
		name: 'Account',
<<<<<<< HEAD
=======
		created() {
			uni.getStorage({
				key: "account",
				success: res => {
					console.log(res);
					if(res.data.type === 1) {
						this.accounts.capital.list.push({name: res.data.account_form.name, icon: res.data.account_type[1], balance: res.data.account_form.balance})
					}
				}
			})
			// console.log(this.data);
		},
>>>>>>> 424108e21b45f55cd5df3c8f79757065c65aae03
		data() {
			return {
				accounts: data.accounts
			}
		},
		methods: {
			onAddAccount() {
				uni.navigateTo({
					url: '/pages/AddAccount/index'
				})
			},
			handleAccount(item) {
				uni.setStorage({
				    key: 'account',
				    data: {
						account_type: [item.name, item.icon],
						account_form: {
							name: item.name,	// 绑定账户名称input
							balance: item.balance,	// 绑定账户余额input
							note: ''	// 绑定账户备注input
						}
					},
				    success: () => {
						uni.navigateTo({
							url: '/pages/AccountEdit/index'
						});
				    }
				});
			}
		},
		components: {
			ImCell
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
	
	
	.account-group .group-title {
		padding-bottom: 10rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>
