<template>
	<view class="add-body">
		<swiper :indicator-dots="true" style="height: 360rpx">
			<swiper-item v-for="(page, index) in typePages" :key="index">
				<view class="swiper-row">
					<view class="swiper-item" v-for="(item, index) in page" :key="index">
						<view class="iconfont icon-qian"></view>
						<view class="name">{{ item }}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	import { pagination } from '@/utils/utils'
	
	export default {
		name: 'TypeSwiper',
		props: {
			types: {
				type: Array,
				default() {
					return ['薪资', '奖金', '礼金', '兼职', '红包', '分红', '借入',
							'薪资', '奖金', '礼金', '兼职', '红包', '分红', '借入',
							'薪资', '奖金', '礼金', '兼职', '红包', '分红', '借入']
				}
			},
			singlePageCount: {
				type: Number,
				default: 8
			}
		},
		computed: {
			typePages() {
				return pagination(this.types, this.singlePageCount)
			}
		}
	}
	
</script>

<style scoped>
	
	.add-body {
		padding-top: 32rpx;
	}
	
	.add-body .swiper-row {
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}
	
	.add-body .swiper-item {
		width: 25%;
		text-align: center;
	}
	
	.swiper-item .iconfont {
		margin: 0 auto;
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
