<template>
	<view class="add_account-container">
		<view class="account-type">
			<view class="title">资金账户</view>
			<im-cell
				icon="icon-xianjin"
				title="现金"
			></im-cell>
			<im-cell
				icon="icon-zhifubao2"
				title="支付宝"
			></im-cell>
			<im-cell
				icon="icon-weixin"
				title="微信"
			></im-cell>
		</view>
		
		<view class="account-type">
			<view class="title">信用账户</view>
			<im-cell
				icon="icon-xinyongka"
				title="信用卡"
			></im-cell>
			<im-cell
				icon="icon-xinyongka"
				title="花呗"
			></im-cell>
		</view>
		
		<view class="other">
			<im-cell
				icon="icon-xinyongka"
				title="其它"
			></im-cell>
		</view>
	</view>
</template>

<script>
	export default {
		
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
