<template>
	<view class="me-container">
		<view class="user-info-wrap">
			<cell height="230" backgroundColor="#188aff">
				<view slot="title" class="user-info">
					<view class="user-photo-wrap">
						<!-- <image src="../../static/img/profile/user.png" mode="widthFix" class="user-photo"></image> -->
					</view>
					<text class="user-name">请登录</text>
				</view>
			</cell>
		</view>
		
		<view class="profile-group">
			<view class="profile-item">
				<cell>
					<text slot="title">分类</text>
					<text slot="value">&gt;</text>
				</cell>
			</view>
			<view class="profile-item">
				<cell>
					<text slot="title">意见反馈</text>
					<text slot="value">&gt;</text>
				</cell>
			</view>
			<view class="profile-item">
				<cell>
					<text slot="title">设置</text>
					<text slot="value">&gt;</text>
				</cell>
			</view>
		</view>
		
		<!-- <custom-tabbar tab-index="4"></custom-tabbar> -->
	</view>
</template>

<script>
	import Cell from "../../components/common/cell/Cell.vue"
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
	
	.user-info {
		display: flex;
		align-items: center;
	}
	
	.user-photo-wrap {
		width: 120rpx;
		height: 120rpx;
		margin-left: 32rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.user-photo {
		width: 100%;
	}
	
	.user-name {
		color: #fff;
		padding-left: 32rpx;
	}
	
	.profile-group {
		background-color: #fff;
	}
	
	.profile-item {
		position: relative;
		margin: 0 32rpx;
	}
	
	.profile-item:nth-child(n+2) {
		border-top: solid 1px #eee;
	}
	
</style>
