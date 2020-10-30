<template>
	<view class="me-container">
		<!-- unlogin status -->
		<block v-if='false'>
			<view class="user-info" @click="handleLogin()">
				<view class="iconfont icon-my"></view>
				<view class="login-tip">请登录</view>
			</view>
		</block>
		<!-- logining status -->
		<block v-else>
			<view class="user-info">
				<view class="user-avatar-wrap">
					<!-- <image class="user-avatar" src="https://api.r10086.com/动漫综合1.php" mode="widthFix"></image> -->
				</view>
				<text class="login-tip">IM Team</text>
			</view>
		</block>
		<!-- *end* login -->
		
		<view class="profile-group">
			<view class="profile-item" @click="onGotoAccountBook">
				<im-cell icon="icon-date" title="账本">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
			<view class="profile-item" @click="onGotoCate">
				<im-cell icon="icon-fenlei" title="分类">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
			<view class="profile-item" @click="onGotoFeedback">
				<im-cell icon="icon-yijianfankui" title="意见反馈" />
			</view>
			<view class="profile-item" @click="onGotoSetting">
				<im-cell icon="icon-shezhi" title="设置">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	export default {
		name: 'Me',
		data() {
			return {
				startX: 0,
				startY: 0,
				moveX: 0,
				moveY: 0
			}
		},
		components: {
			ImCell
		},
		methods: {
			onGotoAccountBook() {
				uni.navigateTo({ url: '/pages/AccountBook/index' });
			},
			onGotoCate() {
				uni.navigateTo({ url: '/pages/CategoryEdit/index' })
			},
			onGotoFeedback() {
				uni.navigateTo({ url: '/pages/Feedback/index' })
			},
			onGotoSetting() {
				uni.navigateTo({ url: '/pages/Setting/index' })
			},
			handleLogin() {
				
			}
		}
	}
</script>

<style scoped>
	.me-container {
		perspective: 800px;
		padding: 32rpx;
	}
	.me-container .user-info {
		display: flex;
		padding: 64rpx 32rpx;
		border-radius: 16px;
		line-height: 120rpx;
		transition: transform .3s;
		background-color: #188AFF;
	}
	.me-container .profile-group {
		margin-top: 64rpx;
	}
	.profile-group .profile-item {
		margin-bottom: 32rpx;
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
