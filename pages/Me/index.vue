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
			<view 
				class="user-info"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd"
				:style="{transform: `rotateY(${-(startX - moveX)/10}deg) rotateX(${(startY - moveY)/8}deg)`}"
			>
				<view class="user-avatar-wrap">
					<image class="user-avatar" src="../../static/image/icon_me.png" mode="widthFix"></image>
				</view> 
				<text class="login-tip">IM Team</text>
			</view>
		</block>
		
		<view class="profile-group">
			<view class="profile-item" @click="onGotoCate">
				<im-cell icon="icon-zhifubao2" title="分类">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
			<view class="profile-item">
				<im-cell icon="icon-zhifubao2" title="意见反馈" />
			</view>
			<view class="profile-item">
				<im-cell icon="icon-zhifubao2" title="设置">
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
			onGotoCate() {
				uni.navigateTo({
					url: '/pages/CategoryEdit/index'
				})
			},
			handleLogin() {
				// uni.login({
				//   provider: 'weixin',
				//   success: res => {
				// 		console.log(res);
				// 		uni.getUserInfo({
				// 		  provider: 'weixin',
				// 		  success: function (infoRes) {
				// 		    console.log(infoRes);
				// 		  }
				// 		});
				// 	}
				// });
			},
			handleTouchStart(event) {
				this.startX = event.touches[0].clientX;
				this.startY = event.touches[0].clientY;
			},
			handleTouchMove(event) {
				this.moveX = event.touches[0].clientX;
				this.moveY = event.touches[0].clientY;
			},
			handleTouchEnd() {
				this.startX = 0;
				this.startY = 0;
				this.moveX = 0;
				this.moveY = 0;
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
