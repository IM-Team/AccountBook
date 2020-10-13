<template>
	<view class="me-container">
		<view class="user-info">
			<!-- unlogin status -->
			<block class="l" v-if='true'>
				<view class="iconfont icon-my"></view>
				<view class="login-tip">请登录</view>
			</block>
			<!-- logining status -->
			<block v-else>
				<view class="user-avatar-wrap">
					<image class="user-avatar" src="../../static/image/icon_me.png" mode="widthFix"></image>
				</view>
				<text class="login-tip">IM Team</text>
			</block>
		</view>
		
		<view class="profile-group">
			<view class="profile-item">
				<cell icon="icon-zhifubao2" title="分类">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</cell>
			</view>
			<view class="profile-item">
				<cell icon="icon-zhifubao2" title="意见反馈">
					<!-- <view slot="content" class="iconfont icon-gengduo"></view> -->
				</cell>
			</view>
			<view class="profile-item">
				<cell icon="icon-zhifubao2" title="设置">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</cell>
			</view>
		</view>
	</view>
</template>

<script>
	import Cell from "../../components/common/Cell/Cell.vue";
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			Cell
		}
	}
</script>

<style scoped>
	.me-container {
		padding: 32rpx;
	}
	.me-container .user-info {
		display: flex;
		padding: 64rpx 32rpx;
		border-radius: 16px;
		line-height: 120rpx;
		background-color: #188AFF;
	}
	.me-container .profile-group {
		margin-top: 32rpx;
	}
	
	.user-info .iconfont {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		font-size: 60rpx;
		text-align: center;
		line-height: 120rpx;
		border-radius: 50%;
		color: #999;
		background-color: #fff;
	}
	.user-info .user-avatar-wrap {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;		
		border-radius: 50%;
		background-color: #fff;
		overflow: hidden;
	}
	.user-avatar-wrap .user-avatar {
		width: 100%;
	}
	.user-info .login-tip {
		color: #fff;
	}
</style>
