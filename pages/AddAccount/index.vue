<template>
	<view class="add_account-container">
		<view class="account-type">
			<view class="title">资金账户</view>
			<im-cell
				v-for="(item, index) in fundAccount"
				@click.native="onAddFundAccount(item)"
				:key="index"
				:icon="item[1]"
				:title="item[0]" />
		</view>
		
		<view class="account-type">
			<view class="title">信用账户</view>
			<im-cell
				v-for="(item, index) in creditAccount"
				@click.native="onAddCreditAccount(item)"
				:key="index"
				:icon="item[1]"
				:title="item[0]" />
		</view>
		
		<view class="other">
			<im-cell icon="icon-xinyongka" title="其它" @click.native="onAddFundAccount(['其他', 'icon-xinyongka'])" />
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	export default {
		name: 'AddAccount',
		data() {
			return {
				fundAccount: [
					['现金', 'icon-xianjin'],
					['支付宝', 'icon-zhifubao2'],
					['微信', 'icon-weixin']
				],
				creditAccount: [
					['信用卡', 'icon-xinyongka'],
					['花呗', 'icon-xinyongka'],
					['白条', 'icon-xinyongka']
				]
			}
		},
		components: {
			ImCell
		},
		methods: {
			onAddCreditAccount(item) {
				uni.setStorage({
				    key: 'account',
				    data: {
						type: 2,
						account_type: item,
						account_form: {
							name: '',	// 账户名称
							balance: 0,	// 账户余额
							note: ''	// 账户备注
						}
					},
				    success: () => {
						uni.navigateTo({
							url: '/pages/AccountEdit/index'
						});
				    }
				});
			},
			onAddFundAccount(item) {
				uni.setStorage({
				    key: 'account',
				    data: {
						type: 1,
						account_type: item,
						account_form: {
							name: '',	// 账户名称
							balance: 0,	// 账户余额
							note: ''	// 账户备注
						}
					},
				    success: () => {
						uni.navigateTo({
							url: '/pages/AccountEdit/index'
						});
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.add_account-container {
		padding: 32rpx;
	}
	.add_account-container .account-type {
		padding-bottom: 48rpx;
	}
	.add_account-container .other {
		/* margin-top: 22rpx; */
	}
	.account-type .title {
		padding-bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
</style>
