<template>
	<view class="add_account-container">
		<view class="account-type">
			<view class="title">资金账户</view>
			<im-cell
				v-for="(item, index) in fundAccount"
				:key="index"
				:icon="item[1]"
				:title="item[0]" />
		</view>
		
		<view class="account-type">
			<view class="title">信用账户</view>
			<im-cell
				v-for="(item, index) in creditAccount"
				:key="index"
				:icon="item[1]"
				:title="item[0]" />
		</view>
		
		<view class="other">
			<im-cell icon="icon-xinyongka" title="其它" />
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
