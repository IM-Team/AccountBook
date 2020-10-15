<template>
	<view class="add_account_form-container">
		<view class="form-header">
			<view class="iconfont icon-zhifubao2"></view>
			<view class="form-header-text">支付宝</view>
		</view>
		<view class="form-wrap">
			<view class="form-item">
				<view class="form-title">账户名称</view>
				<im-cell>
					<input type="text" value="" slot="title" placeholder="请输入账户名称" />
					<view slot="content">0/10</view>
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户信息</view>
				<im-cell title="账户余额">
					<input type="number" value="" slot="content" placeholder="0" />
				</im-cell>
				<im-cell title="备注">
					<input type="text" value="" slot="content" placeholder="请输入" />
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户设置</view>
				<im-cell title="关联账本" content="默认账本 &gt;">
				</im-cell>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.add_account_form-container {
		padding: 32rpx;
		color: #333;
	}
	.form-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-header .iconfont {
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.form-item {
		margin-bottom: 48rpx;
	}
	.form-item .form-title {
		padding-bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
</style>
