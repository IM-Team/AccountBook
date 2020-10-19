<template>
	<view class="add-body">
		<swiper :indicator-dots="true" style="height: 360rpx">
			<swiper-item>
				<view class="swiper-row">
					<view class="swiper-item" v-for="(item, index) in 4" :key="index">
						<view class="iconfont icon-qian"></view>
						<view class="name">工资</view>
					</view>		
				</view>
				<view class="swiper-row">
					<view class="swiper-item" v-for="(item, index) in 4" :key="index">
						<view class="iconfont icon-qian"></view>
						<view class="name">工资</view> 
					</view>		
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-row">
					<view class="swiper-item" v-for="(item, index) in 4" :key="index">
						<view class="iconfont icon-qian"></view>
						<view class="name">工资</view>
					</view>		
				</view>
				<view class="swiper-row">
					<view class="swiper-item" v-for="(item, index) in 4" :key="index">
						<view class="iconfont icon-qian"></view>
						<view class="name">工资</view>
					</view>		
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
</script>

<style scoped>
	
	.add-body {
		padding-top: 32rpx;
	}
	.add-body .swiper-row {
		display: flex;
		justify-content: space-around;
		padding-bottom: 32rpx;
	}
	.add-body .swiper-item {
		text-align: center;
	}
	.swiper-item .iconfont {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.swiper-item .name {
		padding-top: 6rpx;
	}
	
</style>
